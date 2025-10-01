import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Booking } from '../../core/booking';
import { RouterModule, Router } from '@angular/router';
import { ToastService } from '../../shared/toast';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class AdminDashboardComponent implements OnInit {
  allBookings: any[] = [];

  constructor(
    private bookingService: Booking,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.loadAllBookings();
  }

  loadAllBookings(): void {
    this.allBookings = this.bookingService.getAllBookings();
  }

  logout(): void {
    localStorage.removeItem('adminLoggedIn');
    this.toast.show('Admin logged out');
    this.router.navigate(['/admin']);
  }

  editBooking(id: string): void {
    // Step 1: Find the booking from allBookings
    const booking = this.allBookings.find((b) => b.id === id);
    if (!booking) {
      this.toast.show('Booking not found');
      return;
    }

    // Step 2: Prepare updated data (example: change film or date)
    const updatedData = {
      film: booking.film + ' (Edited)',
      date: booking.date,
      seats: booking.seats,
    };

    // Step 3: Call BookingService to update
    this.bookingService.adminUpdateBooking(id, updatedData);
    this.toast.show('Booking updated');
    this.loadAllBookings(); // Refresh list
    this.router.navigate(['/booking/seat-selection']);
  }

  cancelBooking(id: string): void {
    this.bookingService.adminDeleteBooking(id);
    this.toast.show('Booking canceled');
    this.loadAllBookings(); // Refresh list
  }
  goToLogin(): void {
    localStorage.removeItem('currentUser'); // ✅ optional: clear session
    this.router.navigate(['/login']);
  }

  getTotalAmount(booking: any): number {
    return (booking.seatTotal || 0) + (booking.foodTotal || 0);
  }
}
