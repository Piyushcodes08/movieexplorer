import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft, Star, Clock, Calendar, Film, Play, Info } from 'lucide-react';

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getMovie() {
      setLoading(true);
      // Fixed: Use &i= instead of &s= to get full details by ID
      const res = await fetch(`https://www.omdbapi.com/?apikey=d5a6ae2d&i=${id}&plot=full`);
      const data = await res.json();
      setMovie(data);
      setLoading(false);
    }
    getMovie();
  }, [id]);

  if (loading) return (
    <div className="h-screen w-full bg-[#050505] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-[#050505] text-white overflow-hidden pb-20">
      
      {/* 1. Cinematic Background Blur */}
      <div 
        className="absolute inset-0 bg-cover bg-center scale-110 blur-[100px] opacity-30 pointer-events-none transition-all duration-1000"
        style={{ backgroundImage: `url(${movie.Poster})` }}
      />

      {/* 2. Top Navigation */}
      <nav className="relative z-20 container mx-auto px-6 py-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all group backdrop-blur-md"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform text-red-500" />
          <span className="text-sm font-bold uppercase tracking-widest">Back to Gallery</span>
        </button>
      </nav>

      {/* 3. Content Grid */}
      <main className="relative z-10 container mx-auto px-6 flex flex-col lg:flex-row gap-12 items-start">
        
        {/* Left: Poster with floating effect */}
        <div className="relative w-full lg:w-[400px] flex-shrink-0 group mx-auto lg:mx-0">
          <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-yellow-500 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <img 
            className="relative w-full rounded-[2.5rem] shadow-2xl border border-white/10 object-cover transform transition-transform duration-500 hover:scale-[1.02]"
            src={movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/400x600'} 
            alt={movie.Title} 
          />
        </div>

        {/* Right: Detailed Info */}
        <div className="flex-1 flex flex-col">
          {/* Badge & Rating */}
          <div className="flex items-center gap-4 mb-6">
            <span className="px-4 py-1 bg-red-600/20 text-red-500 border border-red-600/30 rounded-full text-xs font-black uppercase tracking-widest italic">
              Official Entry
            </span>
            <div className="flex items-center gap-2 text-yellow-400 font-bold bg-yellow-400/10 px-3 py-1 rounded-full border border-yellow-400/20">
              <Star size={18} fill="currentColor" />
              <span>{movie.imdbRating} <span className="text-white/50 text-sm font-normal">/ 10</span></span>
            </div>
          </div>

          <h1 className="text-5xl md:text-8xl font-black mb-4 leading-none tracking-tighter uppercase italic drop-shadow-2xl">
            {movie.Title}
          </h1>

          {/* Metadata Row */}
          <div className="flex flex-wrap gap-6 mb-10 text-gray-400">
            <div className="flex items-center gap-2"><Calendar size={18} className="text-red-500"/> {movie.Year}</div>
            <div className="flex items-center gap-2"><Clock size={18} className="text-red-500"/> {movie.Runtime}</div>
            <div className="flex items-center gap-2"><Film size={18} className="text-red-500"/> {movie.Rated}</div>
          </div>

          {/* Plot Card */}
          <div className="relative p-1 rounded-[2.5rem] bg-gradient-to-br from-white/10 to-transparent mb-8">
            <div className="bg-[#0f0f0f]/80 backdrop-blur-xl rounded-[2.4rem] p-8 md:p-10 border border-white/5">
              <div className="flex items-center gap-2 mb-6 text-red-500">
                <Info size={24} />
                <h3 className="font-bold uppercase tracking-[0.2em] text-xs text-white">The Premise</h3>
              </div>
              <p className="text-gray-200 text-lg md:text-xl leading-relaxed italic font-light">
                "{movie.Plot}"
              </p>
            </div>
          </div>

          {/* Secondary Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="space-y-1">
              <span className="text-xs uppercase text-gray-500 font-bold tracking-widest">Director</span>
              <p className="text-white font-medium">{movie.Director}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs uppercase text-gray-500 font-bold tracking-widest">Starring</span>
              <p className="text-white font-medium">{movie.Actors}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs uppercase text-gray-500 font-bold tracking-widest">Genre</span>
              <p className="text-white font-medium">{movie.Genre}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs uppercase text-gray-500 font-bold tracking-widest">Box Office</span>
              <p className="text-white font-medium">{movie.BoxOffice || 'N/A'}</p>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap gap-4">
            <button className="flex items-center gap-3 px-10 py-5 bg-white text-black rounded-full font-black uppercase tracking-tighter hover:bg-red-600 hover:text-white transition-all transform active:scale-95 shadow-xl shadow-white/5">
              <Play size={20} fill="currentColor" /> Play Now
            </button>
            <button className="px-10 py-5 bg-white/5 border border-white/10 rounded-full font-black uppercase tracking-tighter hover:bg-white/10 transition-all">
              Add to List
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}

export default MovieDetail;