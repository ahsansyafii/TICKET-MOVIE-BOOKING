import React from 'react';
import { Movie, Studio, ShowTime } from '../types';
import { Monitor, Users, Calendar, Clock } from 'lucide-react';

interface StudioShowtimeSelectionProps {
  selectedMovie: Movie;
  studios: Studio[];
  showTimes: ShowTime[];
  selectedStudio: Studio | null;
  selectedShowTime: ShowTime | null;
  onSelectStudio: (studio: Studio) => void;
  onSelectShowTime: (showTime: ShowTime) => void;
  onNext: () => void;
  onBack: () => void;
}

const StudioShowtimeSelection: React.FC<StudioShowtimeSelectionProps> = ({
  selectedMovie,
  studios,
  showTimes,
  selectedStudio,
  selectedShowTime,
  onSelectStudio,
  onSelectShowTime,
  onNext,
  onBack
}) => {
  const filteredShowTimes = showTimes.filter(
    (showTime) => showTime.movieId === selectedMovie.id
  );

  const availableShowTimes = selectedStudio
    ? filteredShowTimes.filter((showTime) => showTime.studioId === selectedStudio.id)
    : [];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Select Studio & Showtime</h1>
        <p className="text-gray-600">Choose your preferred cinema experience for "{selectedMovie.title}"</p>
      </div>

      {/* Studio Selection */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Select Studio</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {studios.map((studio) => (
            <div
              key={studio.id}
              className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                selectedStudio?.id === studio.id
                  ? 'border-blue-500 bg-blue-50 shadow-lg'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
              }`}
              onClick={() => onSelectStudio(studio)}
            >
              <div className="text-center">
                <Monitor className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{studio.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{studio.type}</p>
                <div className="flex items-center justify-center space-x-1">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{studio.capacity} seats</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Showtime Selection */}
      {selectedStudio && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Select Showtime</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {availableShowTimes.map((showTime) => (
              <div
                key={showTime.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  selectedShowTime?.id === showTime.id
                    ? 'border-blue-500 bg-blue-50 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                }`}
                onClick={() => onSelectShowTime(showTime)}
              >
                <div className="text-center">
                  <Clock className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  <p className="text-lg font-semibold text-gray-900">{showTime.time}</p>
                  <div className="flex items-center justify-center space-x-1 mt-1">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{showTime.date}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {showTime.bookedSeats.length} seats taken
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-200"
        >
          Back to Movies
        </button>
        
        {selectedStudio && selectedShowTime && (
          <button
            onClick={onNext}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Select Seats
          </button>
        )}
      </div>
    </div>
  );
};

export default StudioShowtimeSelection;