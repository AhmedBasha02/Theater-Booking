import { Component } from '@angular/core';
import { User } from '../../core/models/user.model';
import { Auth } from '../../core/auth';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
})
export class RegisterComponent {
  email = '';
  password = '';
  confirmPassword = '';
  error = '';

  constructor(private auth: Auth, private router: Router) {}

  register(): void {
    const email = this.email.trim();
    const password = this.password.trim();
    const confirmPassword = this.confirmPassword.trim();

    // Validate required fields
    if (!email || !password || !confirmPassword) {
      this.error = 'All fields are required';
      return;
    }

    // Validate password match
    if (password !== confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }

    const user: User = { email, password };

    // Try registering via service
    const success = this.auth.register(user);

    if (success) {
      // Save user to localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', email);

      this.router.navigate(['/user']);
    } else {
      this.error = 'Email already registered';
    }
  }
}
