import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Booking } from '../../core/booking';
import { Router, RouterModule } from '@angular/router';
import { ToastService } from '../../shared/toast';
@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './history.html',
  styleUrls: ['./history.scss'],
})
export class HistoryComponent implements OnInit {
  userId = localStorage.getItem('currentUser');
  bookings: any[] = [];

  constructor(
    private bookingService: Booking,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    if (this.userId) {
      this.bookings = this.bookingService.getBookings(this.userId);
    }
  }

  cancelBooking(bookingId: string, showId: string, seatIds: string[]): void {
    this.bookingService.cancelSeat(showId, seatIds);
    if (!this.userId) return;
    this.bookingService.deleteBooking(this.userId!, bookingId);
    this.toast.show('Booking canceled successfully');
    this.loadBookings();
  }

  getTotalAmount(booking: any): number {
    return (booking.seatTotal || 0) + (booking.foodTotal || 0);
  }

  getSeatList(booking: any): string {
    return booking.seats.map((s: any) => s.id).join(', ');
  }

  goToDashboard(): void {
    this.router.navigate(['/user']);
  }
}
