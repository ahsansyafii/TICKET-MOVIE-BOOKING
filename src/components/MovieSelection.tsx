import React from 'react';
import { Movie } from '../types';
import { Star, Clock, Film } from 'lucide-react';

interface MovieSelectionProps {
  movies: Movie[];
  selectedMovie: Movie | null;
  onSelectMovie: (movie: Movie) => void;
  onNext: () => void;
}

const MovieSelection: React.FC<MovieSelectionProps> = ({
  movies,
  selectedMovie,
  onSelectMovie,
  onNext
}) => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Select a Movie</h1>
        <p className="text-gray-600">Choose from our current selection of movies</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className={`bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${
              selectedMovie?.id === movie.id 
                ? 'ring-4 ring-blue-500 shadow-2xl' 
                : 'hover:shadow-xl'
            }`}
            onClick={() => onSelectMovie(movie)}
          >
            <div className="aspect-w-3 aspect-h-4 relative">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-80 object-cover"
              />
              {selectedMovie?.id === movie.id && (
                <div className="absolute inset-0 bg-blue-500 bg-opacity-20 flex items-center justify-center">
                  <div className="bg-blue-500 text-white px-4 py-2 rounded-full font-semibold">
                    Selected
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-900 mb-2">{movie.title}</h3>
              
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-700">{movie.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{movie.duration}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-1 mb-3">
                <Film className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">{movie.genre}</span>
              </div>
              
              <p className="text-sm text-gray-600 line-clamp-3">{movie.description}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <div className="text-center">
          <button
            onClick={onNext}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Continue to Studio & Showtime
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieSelection;