import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../core/auth';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private auth: Auth, private router: Router) {}

  login(): void {
    const success = this.auth.login(this.email, this.password);

    if (success) {
      localStorage.setItem('currentUser', this.email);
      this.router.navigate(['/user']);
    } else {
      this.error = 'Invalid email or password';
    }
  }

  goToAdmin(): void {
    this.router.navigate(['/admin']);
  }
}
