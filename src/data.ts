import { Movie, Studio, ShowTime, PaymentMethod } from './types';

export const movies: Movie[] = [
  {
    id: '1',
    title: 'Dune: Part Two',
    poster: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '166 min',
    genre: 'Sci-Fi, Action',
    rating: '8.8',
    description: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.'
  },
  {
    id: '2',
    title: 'Oppenheimer',
    poster: 'https://images.pexels.com/photos/3681591/pexels-photo-3681591.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '180 min',
    genre: 'Biography, Drama',
    rating: '8.4',
    description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.'
  },
  {
    id: '3',
    title: 'Barbie',
    poster: 'https://images.pexels.com/photos/1037995/pexels-photo-1037995.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '114 min',
    genre: 'Comedy, Adventure',
    rating: '7.0',
    description: 'Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land.'
  },
  {
    id: '4',
    title: 'John Wick: Chapter 4',
    poster: 'https://images.pexels.com/photos/1906794/pexels-photo-1906794.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '169 min',
    genre: 'Action, Crime',
    rating: '7.7',
    description: 'John Wick uncovers a path to defeating The High Table.'
  }
];

export const studios: Studio[] = [
  {
    id: '1',
    name: 'IMAX Premium',
    capacity: 120,
    type: 'IMAX'
  },
  {
    id: '2',
    name: 'Dolby Atmos',
    capacity: 100,
    type: 'Dolby'
  },
  {
    id: '3',
    name: 'Standard Digital',
    capacity: 80,
    type: 'Standard'
  },
  {
    id: '4',
    name: 'VIP Lounge',
    capacity: 40,
    type: 'VIP'
  }
];

export const showTimes: ShowTime[] = [
  // Dune: Part Two
  { id: '1', time: '10:00 AM', date: '2024-01-15', movieId: '1', studioId: '1', bookedSeats: ['A1', 'A2', 'B5', 'C3'] },
  { id: '2', time: '1:30 PM', date: '2024-01-15', movieId: '1', studioId: '1', bookedSeats: ['D1', 'D2', 'E5'] },
  { id: '3', time: '5:00 PM', date: '2024-01-15', movieId: '1', studioId: '2', bookedSeats: ['A3', 'B1', 'B2'] },
  { id: '4', time: '8:30 PM', date: '2024-01-15', movieId: '1', studioId: '2', bookedSeats: ['C4', 'C5', 'D3'] },
  
  // Oppenheimer
  { id: '5', time: '11:00 AM', date: '2024-01-15', movieId: '2', studioId: '3', bookedSeats: ['A1', 'A2', 'B3'] },
  { id: '6', time: '2:30 PM', date: '2024-01-15', movieId: '2', studioId: '3', bookedSeats: ['C1', 'C2', 'D4'] },
  { id: '7', time: '6:00 PM', date: '2024-01-15', movieId: '2', studioId: '4', bookedSeats: ['A1', 'B1', 'B2'] },
  { id: '8', time: '9:30 PM', date: '2024-01-15', movieId: '2', studioId: '4', bookedSeats: ['C3', 'D1', 'D2'] },
  
  // Barbie
  { id: '9', time: '10:30 AM', date: '2024-01-15', movieId: '3', studioId: '1', bookedSeats: ['A4', 'A5', 'B3'] },
  { id: '10', time: '1:00 PM', date: '2024-01-15', movieId: '3', studioId: '2', bookedSeats: ['C1', 'C2', 'D5'] },
  { id: '11', time: '4:30 PM', date: '2024-01-15', movieId: '3', studioId: '3', bookedSeats: ['A2', 'B4', 'C3'] },
  { id: '12', time: '7:00 PM', date: '2024-01-15', movieId: '3', studioId: '4', bookedSeats: ['A1', 'B1', 'C1'] },
  
  // John Wick: Chapter 4
  { id: '13', time: '11:30 AM', date: '2024-01-15', movieId: '4', studioId: '1', bookedSeats: ['A3', 'B2', 'C4'] },
  { id: '14', time: '3:00 PM', date: '2024-01-15', movieId: '4', studioId: '2', bookedSeats: ['B1', 'B2', 'C5'] },
  { id: '15', time: '6:30 PM', date: '2024-01-15', movieId: '4', studioId: '3', bookedSeats: ['A1', 'A2', 'B3'] },
  { id: '16', time: '10:00 PM', date: '2024-01-15', movieId: '4', studioId: '4', bookedSeats: ['C2', 'C3', 'D4'] }
];

export const paymentMethods: PaymentMethod[] = [
  {
    id: '1',
    name: 'Credit Card',
    type: 'card',
    adminFee: 2.5,
    description: 'Visa, MasterCard, American Express'
  },
  {
    id: '2',
    name: 'PayPal',
    type: 'paypal',
    adminFee: 3.0,
    description: 'Pay securely with your PayPal account'
  },
  {
    id: '3',
    name: 'Apple Pay',
    type: 'apple',
    adminFee: 1.5,
    description: 'Touch ID or Face ID required'
  },
  {
    id: '4',
    name: 'Google Pay',
    type: 'google',
    adminFee: 1.5,
    description: 'Pay with your Google account'
  },
  {
    id: '5',
    name: 'Bank Transfer',
    type: 'bank',
    adminFee: 1.0,
    description: 'Direct bank transfer'
  }
];