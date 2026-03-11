import React, { useState } from 'react';
import AccordionCards from "./AccordionCards";

const MovieList = ({ movies }) => {
  // We track the active movie ID here so all cards sync up
  const [activeID, setActiveID] = useState(movies[0]?.imdbID);

  if (!movies || movies.length === 0) {
    return <p className="text-center text-gray-400 mt-10">No Movies Found.</p>;
  }

  return (
    <div className="flex flex-col md:flex-row items-stretch w-full max-w-[600px] h-[600px] md:h-[500px] gap-3 mx-auto px-4 py-10">
      {movies.slice(0, 6).map((movie) => (
        <AccordionCards
          key={movie.imdbID}
          movie={movie}
          isActive={activeID === movie.imdbID}
          onToggle={() => setActiveID(movie.imdbID)}
        />
      ))}
    </div>
  );
};

export default MovieList;