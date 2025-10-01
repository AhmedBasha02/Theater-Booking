import { Injectable } from '@angular/core';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  login(email: string, password: string): boolean {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    return users.some((u: User) => u.email === email && u.password === password);
  }

  register(user: User): boolean {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find((u: User) => u.email === user.email)) return false;
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  }
}
