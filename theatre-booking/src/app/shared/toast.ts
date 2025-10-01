import { Injectable } from '@angular/core';

interface Toast {
  message: string;
  duration?: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: Toast[] = [];

  show(message: string, duration: number = 3000): void {
    const toast: Toast = { message, duration };
    this.toasts.push(toast);

    setTimeout(() => this.remove(toast), duration);
  }

  remove(toast: Toast): void {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }
}
