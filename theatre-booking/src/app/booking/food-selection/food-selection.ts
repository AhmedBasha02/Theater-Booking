import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodPackage } from '../../core/models/food.model';
import { Booking } from '../../core/booking';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastService } from '../../shared/toast';

@Component({
  selector: 'app-food-selection',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './food-selection.html',
  styleUrls: ['./food-selection.scss'],
})
export class FoodSelectionComponent {
  userId = localStorage.getItem('currentUser');
  bookingId = ''; // should be passed via route or service
  selectedFood: FoodPackage[] = [];

  foodPackages: FoodPackage[] = [
    { id: 'f1', name: 'Popcorn Combo', price: 50 },
    { id: 'f2', name: 'Nachos & Drink', price: 60 },
    { id: 'f3', name: 'Hotdog Meal', price: 70 },
  ];

  constructor(
    private bookingService: Booking,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastService
  ) {}

  toggleFood(pkg: FoodPackage): void {
    const index = this.selectedFood.findIndex((f) => f.id === pkg.id);
    if (index > -1) {
      this.selectedFood.splice(index, 1);
    } else {
      this.selectedFood.push(pkg);
    }
  }
  confirmFood(): void {
    const bookingId = this.route.snapshot.paramMap.get('bookingId')!;
    const userId = this.bookingService.findUserIdByBookingId(bookingId);
    if (!this.userId || !this.bookingId || this.selectedFood.length === 0) return;
    this.bookingService.saveFoodSelection(this.userId, this.bookingId, this.selectedFood);
    this.selectedFood = [];
    this.toast.show('Reservation complete! Your booking has been confirmed.');

    this.router.navigate(['/user/history']);
  }

  ngOnInit(): void {
    this.bookingId = this.route.snapshot.paramMap.get('bookingId') || '';
  }

  getFoodTotal(): number {
    return this.selectedFood.reduce((sum, item) => sum + item.price, 0);
  }

  getTotalAmount(): number {
    return this.bookingService.getSeatTotal() + this.getFoodTotal();
  }
}
