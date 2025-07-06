import React, { useState } from 'react';
import { BookingDetails as BookingDetailsType, PaymentMethod } from '../types';
import { Mail, CreditCard, DollarSign, Calendar, Clock, MapPin, Film } from 'lucide-react';

interface BookingDetailsProps {
  bookingDetails: BookingDetailsType;
  paymentMethods: PaymentMethod[];
  onEmailChange: (email: string) => void;
  onPaymentMethodSelect: (method: PaymentMethod) => void;
  onConfirmBooking: () => void;
  onBack: () => void;
}

const BookingDetails: React.FC<BookingDetailsProps> = ({
  bookingDetails,
  paymentMethods,
  onEmailChange,
  onPaymentMethodSelect,
  onConfirmBooking,
  onBack
}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);
  const [email, setEmail] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    onEmailChange(e.target.value);
  };

  const handlePaymentMethodSelect = (method: PaymentMethod) => {
    setSelectedPaymentMethod(method);
    onPaymentMethodSelect(method);
  };

  const adminFee = selectedPaymentMethod ? selectedPaymentMethod.adminFee : 0;
  const totalWithFees = bookingDetails.totalPrice + adminFee;

  const canProceed = email && selectedPaymentMethod;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Booking Details</h1>
        <p className="text-gray-600">Review your booking and complete your purchase</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Booking Summary */}
        <div className="lg:col-span-2 space-y-6">
          {/* Movie Details */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Film className="w-6 h-6 mr-2 text-blue-600" />
              Movie Details
            </h2>
            <div className="flex space-x-4">
              <img
                src={bookingDetails.movie?.poster}
                alt={bookingDetails.movie?.title}
                className="w-20 h-28 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{bookingDetails.movie?.title}</h3>
                <p className="text-gray-600 mb-2">{bookingDetails.movie?.genre}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {bookingDetails.movie?.duration}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {bookingDetails.studio?.name}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Showtime & Seats */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Calendar className="w-6 h-6 mr-2 text-blue-600" />
              Showtime & Seats
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Date & Time</span>
                <span className="font-semibold">{bookingDetails.showTime?.date} • {bookingDetails.showTime?.time}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Studio</span>
                <span className="font-semibold">{bookingDetails.studio?.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Selected Seats</span>
                <div className="flex flex-wrap gap-1">
                  {bookingDetails.selectedSeats.map((seat) => (
                    <span
                      key={seat.id}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium"
                    >
                      {seat.id}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Mail className="w-6 h-6 mr-2 text-blue-600" />
              Customer Information
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  We'll send your booking confirmation to this email address
                </p>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <CreditCard className="w-6 h-6 mr-2 text-blue-600" />
              Payment Method
            </h2>
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    selectedPaymentMethod?.id === method.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handlePaymentMethodSelect(method)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-gray-900">{method.name}</h3>
                      <p className="text-sm text-gray-600">{method.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Admin Fee</p>
                      <p className="font-semibold text-gray-900">${method.adminFee}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Price Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <DollarSign className="w-6 h-6 mr-2 text-blue-600" />
              Price Summary
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Tickets ({bookingDetails.selectedSeats.length})</span>
                <span className="font-semibold">${bookingDetails.totalPrice}</span>
              </div>
              {selectedPaymentMethod && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Admin Fee ({selectedPaymentMethod.name})</span>
                  <span className="font-semibold">${adminFee}</span>
                </div>
              )}
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-blue-600">${totalWithFees}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 space-y-3">
              <button
                onClick={onConfirmBooking}
                disabled={!canProceed}
                className={`w-full py-3 rounded-lg font-semibold transition-colors duration-200 ${
                  canProceed
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Confirm Booking
              </button>
              <button
                onClick={onBack}
                className="w-full py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-200"
              >
                Back to Seat Selection
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;