import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { entries } from '../data/entries';

export default function Landing() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const upperCode = code.toUpperCase();
    
    if (entries[upperCode]) {
      navigate(`/entry/${upperCode}`);
    } else {
      setError('Invalid code. Try again.');
      setCode('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 relative overflow-hidden">
      {/* Animated neon background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 bg-red-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-cyan-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-32 h-32 bg-pink-500/25 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        {/* Main Title Section */}
        <div className="text-center mb-16">
          <h1 className="text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-red-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent animate-pulse-glow font-display mb-4">
            XO
          </h1>
          <p className="text-3xl md:text-4xl text-gray-300 font-handwriting tracking-wider">
            Diary
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
          <div className="relative">
            <input
              type="text"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError('');
              }}
              placeholder="Enter your code..."
              className="w-full px-6 py-4 bg-gray-900/80 border border-red-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/50 backdrop-blur-glass text-xl font-mono tracking-wider"
              maxLength={10}
            />
            {error && (
              <p className="text-red-400 text-base mt-2 font-mono">{error}</p>
            )}
          </div>
          
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-red-600 to-purple-600 text-white font-bold text-xl rounded-xl hover:from-red-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl font-display border border-red-500/50 shadow-red-500/30"
          >
            UNLOCK MEMORY
          </button>
        </form>

        {/* Bottom animated indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>
    </div>
  );
}
