import { Injectable } from '@angular/core';
import { Seat } from './models/seat.model';
import { FoodPackage } from './models/food.model';

@Injectable({
  providedIn: 'root',
})
export class Billing {
  calculateTotal(seats: Seat[], food: FoodPackage[]): number {
    const seatCost = seats.length * 100;
    const foodCost = food.reduce((sum, f) => sum + f.price, 0);
    return seatCost + foodCost;
  }
}
