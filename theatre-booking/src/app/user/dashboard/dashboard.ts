import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ToastService } from '../../shared/toast';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class DashboardComponent {
  userEmail = localStorage.getItem('currentUser');

  constructor(private router: Router, private toast: ToastService) {}

  logout(): void {
    localStorage.removeItem('currentUser');
    this.toast.show('You have been logged out');
    this.router.navigate(['/login']);
  }
}
