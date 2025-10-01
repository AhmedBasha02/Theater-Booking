export interface Seat {
  id: string;
  status: 'available' | 'booked';
  price: number;
}
