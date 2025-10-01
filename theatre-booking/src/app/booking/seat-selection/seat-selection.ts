import { Component, OnInit, NgModule } from '@angular/core';
import { Booking } from '../../core/booking';
import { Seat } from '../../core/models/seat.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-seat-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seat-selection.html',
  styleUrls: ['./seat-selection.scss'],
})
export class SeatSelectionComponent implements OnInit {
  showId = 'show1';
  seats: Seat[] = [];
  selectedSeats: string[] = [];
  userId = localStorage.getItem('currentUser');

  constructor(private bookingService: Booking, private router: Router) {}

  ngOnInit(): void {
    this.initializeSeats();
  }

  initializeSeats(): void {
    const existingSeats = this.bookingService.getSeats(this.showId);
    if (existingSeats.length === 0) {
      const generatedSeats: Seat[] = [];
      for (let row = 1; row <= 5; row++) {
        for (let col = 1; col <= 8; col++) {
          generatedSeats.push({
            id: `R${row}C${col}`,
            status: 'available',
            price: 50 + row * 10,
          });
        }
      }
      localStorage.setItem(`seats-${this.showId}`, JSON.stringify(generatedSeats));
      this.seats = generatedSeats;
    } else {
      this.seats = existingSeats;
    }
  }
  toggleSeat(seat: Seat): void {
    if (seat.status === 'booked') return;

    if (this.selectedSeats.includes(seat.id)) {
      this.selectedSeats = this.selectedSeats.filter((id) => id !== seat.id);
    } else {
      this.selectedSeats.push(seat.id);
    }
  }
  confirmBooking(): void {
    if (!this.userId || this.selectedSeats.length === 0) return;

    const bookingId = 'booking-' + new Date().getTime();
    this.bookingService.bookSeat(this.showId, this.selectedSeats);
    this.bookingService.saveBooking(this.userId, this.showId, this.selectedSeats, bookingId);

    this.selectedSeats = [];
    this.seats = this.bookingService.getSeats(this.showId);

    this.router.navigate(['/booking/food-selection', bookingId]);
  }

  getSeatTotal(): number {
    return this.selectedSeats
      .map((seatId) => this.seats.find((seat) => seat.id === seatId))
      .filter((seat): seat is Seat => !!seat)
      .reduce((sum, seat) => sum + seat.price, 0);
  }
}
