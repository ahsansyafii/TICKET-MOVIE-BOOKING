export interface Movie {
  id: string;
  title: string;
  poster: string;
  duration: string;
  genre: string;
  rating: string;
  description: string;
}

export interface Studio {
  id: string;
  name: string;
  capacity: number;
  type: string;
}

export interface ShowTime {
  id: string;
  time: string;
  date: string;
  movieId: string;
  studioId: string;
  bookedSeats: string[];
}

export interface Seat {
  id: string;
  row: string;
  number: number;
  type: 'regular' | 'premium' | 'vip';
  price: number;
  isBooked: boolean;
  isSelected: boolean;
}

export interface BookingDetails {
  movie: Movie | null;
  studio: Studio | null;
  showTime: ShowTime | null;
  selectedSeats: Seat[];
  userEmail: string;
  totalPrice: number;
}

export interface PaymentMethod {
  id: string;
  name: string;
  type: string;
  adminFee: number;
  description: string;
}