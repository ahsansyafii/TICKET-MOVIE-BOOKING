import React from 'react';
import { Seat, Studio, ShowTime } from '../types';
import { Monitor, Users, AlertCircle } from 'lucide-react';

interface SeatSelectionProps {
  studio: Studio;
  showTime: ShowTime;
  seats: Seat[];
  selectedSeats: Seat[];
  onSelectSeat: (seat: Seat) => void;
  onNext: () => void;
  onBack: () => void;
}

const SeatSelection: React.FC<SeatSelectionProps> = ({
  studio,
  showTime,
  seats,
  selectedSeats,
  onSelectSeat,
  onNext,
  onBack
}) => {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const seatsPerRow = 10;
  const maxSeats = 5;

  const getSeatStatus = (row: string, seatNumber: number) => {
    const seatId = `${row}${seatNumber}`;
    const isBooked = showTime.bookedSeats.includes(seatId);
    const isSelected = selectedSeats.some(seat => seat.id === seatId);
    
    return { isBooked, isSelected };
  };

  const handleSeatClick = (row: string, seatNumber: number) => {
    const seatId = `${row}${seatNumber}`;
    const { isBooked } = getSeatStatus(row, seatNumber);
    
    if (isBooked) return;

    const isCurrentlySelected = selectedSeats.some(seat => seat.id === seatId);
    
    if (isCurrentlySelected) {
      // Remove seat from selection
      const seat = seats.find(s => s.id === seatId);
      if (seat) onSelectSeat(seat);
    } else {
      // Add seat to selection if under limit
      if (selectedSeats.length < maxSeats) {
        const seat: Seat = {
          id: seatId,
          row,
          number: seatNumber,
          type: 'regular',
          price: 20,
          isBooked: false,
          isSelected: true
        };
        onSelectSeat(seat);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Select Your Seats</h1>
        <p className="text-gray-600">Choose up to {maxSeats} seats for your movie experience</p>
      </div>

      {/* Studio Info */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{studio.name}</h2>
            <p className="text-gray-600">{showTime.time} • {showTime.date}</p>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-5 h-5 text-gray-500" />
            <span className="text-gray-600">{studio.capacity} seats</span>
          </div>
        </div>
      </div>

      {/* Screen */}
      <div className="mb-8">
        <div className="bg-gray-800 text-white text-center py-4 rounded-lg mb-4">
          <Monitor className="w-8 h-8 mx-auto mb-2" />
          <span className="text-lg font-semibold">SCREEN</span>
        </div>
      </div>

      {/* Seat Map */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="space-y-4">
          {rows.map((row) => (
            <div key={row} className="flex items-center justify-center space-x-2">
              <div className="w-8 text-center font-semibold text-gray-700">{row}</div>
              <div className="flex space-x-1">
                {Array.from({ length: seatsPerRow }, (_, i) => i + 1).map((seatNumber) => {
                  const { isBooked, isSelected } = getSeatStatus(row, seatNumber);
                  
                  return (
                    <button
                      key={seatNumber}
                      onClick={() => handleSeatClick(row, seatNumber)}
                      disabled={isBooked}
                      className={`w-8 h-8 rounded-md border-2 text-xs font-semibold transition-all duration-200 ${
                        isBooked
                          ? 'bg-red-500 border-red-500 text-white cursor-not-allowed'
                          : isSelected
                          ? 'bg-blue-500 border-blue-500 text-white shadow-lg'
                          : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200 hover:border-gray-400'
                      }`}
                    >
                      {seatNumber}
                    </button>
                  );
                })}
              </div>
              <div className="w-8"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="bg-gray-50 rounded-lg p-4 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Legend</h3>
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gray-100 border-2 border-gray-300 rounded-md"></div>
            <span className="text-sm text-gray-600">Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-blue-500 border-2 border-blue-500 rounded-md"></div>
            <span className="text-sm text-gray-600">Selected</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-red-500 border-2 border-red-500 rounded-md"></div>
            <span className="text-sm text-gray-600">Booked</span>
          </div>
        </div>
      </div>

      {/* Selection Summary */}
      {selectedSeats.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Selected Seats</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedSeats.map((seat) => (
              <span
                key={seat.id}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {seat.id}
              </span>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <span className="text-blue-900 font-medium">
              {selectedSeats.length} seat{selectedSeats.length > 1 ? 's' : ''} selected
            </span>
            <span className="text-xl font-bold text-blue-900">
              ${selectedSeats.length * 20}
            </span>
          </div>
        </div>
      )}

      {/* Warning */}
      {selectedSeats.length === maxSeats && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-8">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-orange-600" />
            <span className="text-orange-800 font-medium">
              You've reached the maximum limit of {maxSeats} seats per booking.
            </span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-200"
        >
          Back to Showtime
        </button>
        
        {selectedSeats.length > 0 && (
          <button
            onClick={onNext}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Continue to Booking Details
          </button>
        )}
      </div>
    </div>
  );
};

export default SeatSelection;