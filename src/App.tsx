import React, { useState } from 'react';
import { Movie, Studio, ShowTime, Seat, BookingDetails as BookingDetailsType, PaymentMethod } from './types';
import { movies, studios, showTimes, paymentMethods } from './data';
import MovieSelection from './components/MovieSelection';
import StudioShowtimeSelection from './components/StudioShowtimeSelection';
import SeatSelection from './components/SeatSelection';
import BookingDetails from './components/BookingDetails';
import BookingConfirmation from './components/BookingConfirmation';

type BookingStep = 'movie' | 'studio' | 'seats' | 'booking' | 'confirmation';

function App() {
  const [currentStep, setCurrentStep] = useState<BookingStep>('movie');
  const [bookingDetails, setBookingDetails] = useState<BookingDetailsType>({
    movie: null,
    studio: null,
    showTime: null,
    selectedSeats: [],
    userEmail: '',
    totalPrice: 0
  });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);

  const handleSelectMovie = (movie: Movie) => {
    setBookingDetails(prev => ({
      ...prev,
      movie,
      studio: null,
      showTime: null,
      selectedSeats: [],
      totalPrice: 0
    }));
  };

  const handleSelectStudio = (studio: Studio) => {
    setBookingDetails(prev => ({
      ...prev,
      studio,
      showTime: null,
      selectedSeats: [],
      totalPrice: 0
    }));
  };

  const handleSelectShowTime = (showTime: ShowTime) => {
    setBookingDetails(prev => ({
      ...prev,
      showTime,
      selectedSeats: [],
      totalPrice: 0
    }));
  };

  const handleSelectSeat = (seat: Seat) => {
    setBookingDetails(prev => {
      const isSelected = prev.selectedSeats.some(s => s.id === seat.id);
      const newSelectedSeats = isSelected
        ? prev.selectedSeats.filter(s => s.id !== seat.id)
        : [...prev.selectedSeats, seat];
      
      return {
        ...prev,
        selectedSeats: newSelectedSeats,
        totalPrice: newSelectedSeats.length * 20
      };
    });
  };

  const handleEmailChange = (email: string) => {
    setBookingDetails(prev => ({
      ...prev,
      userEmail: email
    }));
  };

  const handlePaymentMethodSelect = (method: PaymentMethod) => {
    setSelectedPaymentMethod(method);
  };

  const handleConfirmBooking = () => {
    // In a real app, this would process the payment
    setCurrentStep('confirmation');
  };

  const handleStartNewBooking = () => {
    setCurrentStep('movie');
    setBookingDetails({
      movie: null,
      studio: null,
      showTime: null,
      selectedSeats: [],
      userEmail: '',
      totalPrice: 0
    });
    setSelectedPaymentMethod(null);
  };

  const generateBookingId = () => {
    return 'BK' + Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'movie':
        return (
          <MovieSelection
            movies={movies}
            selectedMovie={bookingDetails.movie}
            onSelectMovie={handleSelectMovie}
            onNext={() => setCurrentStep('studio')}
          />
        );
      case 'studio':
        return (
          <StudioShowtimeSelection
            selectedMovie={bookingDetails.movie!}
            studios={studios}
            showTimes={showTimes}
            selectedStudio={bookingDetails.studio}
            selectedShowTime={bookingDetails.showTime}
            onSelectStudio={handleSelectStudio}
            onSelectShowTime={handleSelectShowTime}
            onNext={() => setCurrentStep('seats')}
            onBack={() => setCurrentStep('movie')}
          />
        );
      case 'seats':
        return (
          <SeatSelection
            studio={bookingDetails.studio!}
            showTime={bookingDetails.showTime!}
            seats={[]}
            selectedSeats={bookingDetails.selectedSeats}
            onSelectSeat={handleSelectSeat}
            onNext={() => setCurrentStep('booking')}
            onBack={() => setCurrentStep('studio')}
          />
        );
      case 'booking':
        return (
          <BookingDetails
            bookingDetails={bookingDetails}
            paymentMethods={paymentMethods}
            onEmailChange={handleEmailChange}
            onPaymentMethodSelect={handlePaymentMethodSelect}
            onConfirmBooking={handleConfirmBooking}
            onBack={() => setCurrentStep('seats')}
          />
        );
      case 'confirmation':
        return (
          <BookingConfirmation
            bookingDetails={bookingDetails}
            paymentMethod={selectedPaymentMethod!}
            bookingId={generateBookingId()}
            onStartNewBooking={handleStartNewBooking}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">🎬</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">CinemaBook</h1>
            </div>
            
            {/* Progress Indicator */}
            <div className="hidden md:flex items-center space-x-4">
              {[
                { key: 'movie', label: 'Movie' },
                { key: 'studio', label: 'Studio' },
                { key: 'seats', label: 'Seats' },
                { key: 'booking', label: 'Booking' },
                { key: 'confirmation', label: 'Confirmation' }
              ].map((step, index) => (
                <div key={step.key} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    currentStep === step.key
                      ? 'bg-blue-600 text-white'
                      : index < ['movie', 'studio', 'seats', 'booking', 'confirmation'].indexOf(currentStep)
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {index + 1}
                  </div>
                  <span className={`ml-2 text-sm ${
                    currentStep === step.key ? 'text-blue-600 font-semibold' : 'text-gray-600'
                  }`}>
                    {step.label}
                  </span>
                  {index < 4 && <div className="w-8 h-0.5 bg-gray-200 mx-4"></div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8">
        {renderCurrentStep()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p>&copy; 2024 CinemaBook. All rights reserved.</p>
          <p className="text-gray-400 mt-2">Experience cinema like never before</p>
        </div>
      </footer>
    </div>
  );
}

export default App;