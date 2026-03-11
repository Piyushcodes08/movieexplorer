import React from 'react';
import { Play } from 'lucide-react';
import { Link } from "react-router-dom";

const AccordionCards = ({ movie, isActive, onToggle }) => {
  return (
    <div
      onClick={onToggle}
      className={`relative overflow-hidden cursor-pointer rounded-[30px] transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] bg-cover bg-center 
        ${isActive ? 'flex-[10] grayscale-0' : 'flex-1 grayscale-[0.5] hover:grayscale-[0.2]'}
      `}
      style={{ 
        backgroundImage: `url(${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/400x600?text=No+Poster'})` 
      }}
    >
      {/* Dark Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-60'}`} />

      {/* Content Container */}
      <div className="absolute bottom-6 left-5 right-5 flex items-center overflow-hidden">
        
        {/* Play Icon / Number Circle */}
        <div className="min-w-[45px] h-[45px] bg-white rounded-full flex justify-center items-center text-black shadow-lg">
          <Play size={20} fill="currentColor" />
        </div>

        {/* Text Details (Only visible when active) */}
        <div className={`flex flex-col ml-4 transition-all duration-500 delay-100 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
          <h3 className="font-bold text-xl text-white truncate max-w-[200px] md:max-w-full">
            {movie.Title}
          </h3>
          <p className="text-gray-300 text-sm mb-2">{movie.Year}</p>
          
          <Link 
            to={`/movie/${movie.imdbID}`}
            onClick={(e) => e.stopPropagation()} 
            className="w-fit px-4 py-1 bg-gradient-to-r from-[#ffba08] to-[#d00000] text-black text-xs font-black rounded-full uppercase tracking-wider hover:scale-105 transition-transform"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccordionCards;