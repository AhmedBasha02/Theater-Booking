import { Injectable } from '@angular/core';
import { Seat } from './models/seat.model';
import { FoodPackage } from './models/food.model';
@Injectable({
  providedIn: 'root',
})
export class Booking {
  getSeats(showId: string): Seat[] {
    return JSON.parse(localStorage.getItem(`seats-${showId}`) || '[]');
  }

  bookSeat(showId: string, seatIds: string[]): void {
    const seats = this.getSeats(showId);
    seatIds.forEach((id) => {
      const seat = seats.find((s) => s.id === id);
      if (seat) seat.status = 'booked';
    });
    localStorage.setItem(`seats-${showId}`, JSON.stringify(seats));
  }

  cancelSeat(showId: string, seatIds: string[]): void {
    const seats = this.getSeats(showId);
    seatIds.forEach((id) => {
      const seat = seats.find((s) => s.id === id);
      if (seat) seat.status = 'available';
    });
    localStorage.setItem(`seats-${showId}`, JSON.stringify(seats));
  }

  saveBooking(userId: string, showId: string, seatIds: string[], bookingId: string): void {
    const allSeats = this.getSeats(showId);
    const selectedSeats = allSeats.filter((s) => seatIds.includes(s.id));
    const seatTotal = selectedSeats.reduce((sum, s) => sum + (s.price || 0), 0);

    const booking = {
      id: bookingId,
      showId,
      //seats: seatIds,
      seats: selectedSeats,
      seatTotal,
      food: [],
      foodTotal: 0,
    };
    const bookings = JSON.parse(localStorage.getItem(`bookings-${userId}`) || '[]');
    bookings.push(booking);
    localStorage.setItem(`bookings-${userId}`, JSON.stringify(bookings));
  }

  getBookings(userId: string): any[] {
    return JSON.parse(localStorage.getItem(`bookings-${userId}`) || '[]');
  }

  deleteBooking(userId: string, bookingId: string): void {
    // let bookings = this.getBookings(userId);
    // bookings = bookings.filter((b) => b.id !== bookingId);
    // localStorage.setItem(`bookings-${userId}`, JSON.stringify(bookings));
    const bookings = this.getBookings(userId);
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return;

    // ✅ Step 1: Remove the booking
    const updatedBookings = bookings.filter((b) => b.id !== bookingId);
    localStorage.setItem(`bookings-${userId}`, JSON.stringify(updatedBookings));

    // ✅ Step 2: Release seats back to available
    const allSeats = this.getSeats(booking.showId);
    booking.seats.forEach((seat: any) => {
      const seatToUpdate = allSeats.find((s) => s.id === seat.id);
      if (seatToUpdate) seatToUpdate.status = 'available';
    });
    localStorage.setItem(`seats-${booking.showId}`, JSON.stringify(allSeats));
  }

  saveFoodSelection(userId: string, bookingId: string, food: FoodPackage[]): void {
    const bookings = this.getBookings(userId);
    const booking = bookings.find((b) => b.id === bookingId);
    if (booking) {
      booking.food = food;
      booking.foodTotal = food.reduce((sum, f) => sum + f.price, 0);
      localStorage.setItem(`bookings-${userId}`, JSON.stringify(bookings));
    }
  }

  getAllBookings(): any[] {
    const allBookings: any[] = [];
    for (let key in localStorage) {
      if (key.startsWith('bookings-')) {
        const userId = key.replace('bookings-', '');
        const userBookings = JSON.parse(localStorage.getItem(key) || '[]');
        userBookings.forEach((b: any) => allBookings.push({ ...b, userId }));
      }
    }
    return allBookings;
  }
  adminDeleteBooking(bookingId: string): void {
    for (let key in localStorage) {
      if (key.startsWith('bookings-')) {
        const bookings = JSON.parse(localStorage.getItem(key) || '[]');
        const updated = bookings.filter((b: any) => b.id !== bookingId);

        if (updated.length !== bookings.length) {
          localStorage.setItem(key, JSON.stringify(updated));
          break; // Booking found and deleted
        }
      }
    }
  }

  adminUpdateBooking(bookingId: string, updatedData: Partial<any>): void {
    for (let key in localStorage) {
      if (key.startsWith('bookings-')) {
        const bookings = JSON.parse(localStorage.getItem(key) || '[]');
        const index = bookings.findIndex((b: any) => b.id === bookingId);

        if (index !== -1) {
          bookings[index] = { ...bookings[index], ...updatedData };
          localStorage.setItem(key, JSON.stringify(bookings));
          break; // Booking found and updated
        }
      }
    }
  }

  private selectedSeats: Seat[] = [];

  getSeatTotal(): number {
    return this.selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  }

  findUserIdByBookingId(bookingId: string): string {
    for (let key in localStorage) {
      if (key.startsWith('bookings-')) {
        const userId = key.replace('bookings-', '');
        const bookings = JSON.parse(localStorage.getItem(key) || '[]');
        if (bookings.some((b: any) => b.id === bookingId)) {
          return userId;
        }
      }
    }
    return '';
  }
}
