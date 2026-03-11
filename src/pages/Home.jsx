import { useState, useEffect, useRef } from 'react';
import MovieList from '../components/MovieList';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  const fetchMovies = async (query) => {
    setLoading(true);
    try {
      const res = await fetch(`https://www.omdbapi.com/?apikey=d5a6ae2d&s=${query}`);
      const data = await res.json();
      setMovies(data.Search || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies("Avengers");
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = inputRef.current.value.trim();
    if (query) fetchMovies(query);
  };

  return (
    <div className='min-h-screen w-full bg-[#000502] px-6'>
      <form onSubmit={handleSearch} className='flex items-center justify-center space-x-4 py-6'>
        <input 
          type="text" 
          placeholder='Search movies...'
          className='text-white placeholder:text-gray-500 bg-[#001219] border border-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 px-6 py-2 w-full max-w-md transition-all'
          ref={inputRef}
        />
        <button type='submit' className='bg-gradient-to-t from-[#d00000] to-[#ffba08] hover:brightness-110 text-black font-bold px-6 py-2 rounded-full uppercase transition-all shadow-lg'>
          Search
        </button>
      </form>

      {loading ? (
        <div className="flex justify-center mt-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-yellow-400"></div>
        </div>
      ) : (
        <MovieList movies={movies} />
      )}
    </div>
  );
};

export default Home;