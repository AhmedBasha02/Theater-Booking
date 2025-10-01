import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Admin {
  private admin = { username: 'admin', password: 'admin123' };

  login(username: string, password: string): boolean {
    return username === this.admin.username && password === this.admin.password;
  }

}
