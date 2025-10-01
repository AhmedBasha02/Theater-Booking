import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class AdminLoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private router: Router) {}

  login(): void {
    const admin = { username: 'admin', password: 'admin123' };

    if (this.username === admin.username && this.password === admin.password) {
      localStorage.setItem('adminLoggedIn', 'true');
      this.router.navigate(['/admin/dashboard']);
    } else {
      this.error = 'Invalid admin credentials';
    }
  }
  goToLogin(): void {
    localStorage.removeItem('currentUser'); // ✅ optional: clear session
    this.router.navigate(['/login']);
  }
}
