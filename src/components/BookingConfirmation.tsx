import React, { useState } from 'react';
import { BookingDetails, PaymentMethod } from '../types';
import { CheckCircle, Download, Mail, Calendar, Clock, MapPin, CreditCard, Film, FileImage } from 'lucide-react';
import { generateTicketPDF, downloadTicketAsImage } from '../utils/ticketGenerator';

interface BookingConfirmationProps {
  bookingDetails: BookingDetails;
  paymentMethod: PaymentMethod;
  bookingId: string;
  onStartNewBooking: () => void;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  bookingDetails,
  paymentMethod,
  bookingId,
  onStartNewBooking
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const totalWithFees = bookingDetails.totalPrice + paymentMethod.adminFee;

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      await generateTicketPDF(bookingDetails, paymentMethod, bookingId);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadImage = async () => {
    setIsDownloading(true);
    try {
      await downloadTicketAsImage(bookingDetails, paymentMethod, bookingId);
    } catch (error) {
      console.error('Error downloading image:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
        <p className="text-gray-600">Your movie tickets have been successfully booked</p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        {/* Booking ID */}
        <div className="text-center mb-6 p-4 bg-green-50 rounded-lg">
          <p className="text-sm text-green-600 font-medium">Booking ID</p>
          <p className="text-2xl font-bold text-green-800">{bookingId}</p>
        </div>

        {/* Movie Details */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Film className="w-6 h-6 mr-2 text-blue-600" />
            Movie Details
          </h2>
          <div className="flex space-x-4">
            <img
              src={bookingDetails.movie?.poster}
              alt={bookingDetails.movie?.title}
              className="w-24 h-32 object-cover rounded-lg"
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{bookingDetails.movie?.title}</h3>
              <p className="text-gray-600 mb-2">{bookingDetails.movie?.genre}</p>
              <p className="text-sm text-gray-500">{bookingDetails.movie?.duration}</p>
            </div>
          </div>
        </div>

        {/* Booking Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-semibold">{bookingDetails.showTime?.date}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p className="font-semibold">{bookingDetails.showTime?.time}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Studio</p>
                <p className="font-semibold">{bookingDetails.studio?.name}</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-semibold">{bookingDetails.userEmail}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <CreditCard className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Payment Method</p>
                <p className="font-semibold">{paymentMethod.name}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Seats */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Selected Seats</h3>
          <div className="flex flex-wrap gap-2">
            {bookingDetails.selectedSeats.map((seat) => (
              <span
                key={seat.id}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {seat.id}
              </span>
            ))}
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Price Breakdown</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Tickets ({bookingDetails.selectedSeats.length})</span>
              <span className="font-semibold">${bookingDetails.totalPrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Admin Fee ({paymentMethod.name})</span>
              <span className="font-semibold">${paymentMethod.adminFee}</span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between text-lg font-bold">
                <span>Total Paid</span>
                <span className="text-blue-600">${totalWithFees}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Important Information */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Information</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Please arrive at least 15 minutes before the show time</li>
            <li>• Bring a valid ID for verification</li>
            <li>• Your booking confirmation has been sent to {bookingDetails.userEmail}</li>
            <li>• Screenshots of this confirmation can be used for entry</li>
          </ul>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <div className="flex flex-col sm:flex-row gap-3">
          <button 
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-5 h-5" />
            <span>{isDownloading ? 'Generating...' : 'Download PDF Ticket'}</span>
          </button>
          <button 
            onClick={handleDownloadImage}
            disabled={isDownloading}
            className="flex items-center justify-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FileImage className="w-5 h-5" />
            <span>{isDownloading ? 'Generating...' : 'Download Image'}</span>
          </button>
        </div>
        <button
          onClick={onStartNewBooking}
          className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-200"
        >
          Book Another Movie
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmation;