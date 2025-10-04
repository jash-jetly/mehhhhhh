import { useParams, useNavigate } from 'react-router-dom';
import { entries } from '../data/entries';
import { useEffect, useRef, useState } from 'react';

export default function Entry() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [audioError, setAudioError] = useState(false);
  
  const entry = code ? entries[code] : null;

  useEffect(() => {
    if (audioRef.current && entry?.songUrl) {
      const audio = audioRef.current;
      
      const handleCanPlay = () => {
        setAudioLoaded(true);
        audio.volume = 0.3;
        audio.play().catch(error => {
          console.log('Audio autoplay failed:', error);
        });
      };

      const handleError = () => {
        setAudioError(true);
        console.log('Audio failed to load');
      };

      audio.addEventListener('canplay', handleCanPlay);
      audio.addEventListener('error', handleError);

      return () => {
        audio.removeEventListener('canplay', handleCanPlay);
        audio.removeEventListener('error', handleError);
      };
    }
  }, [entry?.songUrl]);

  if (!entry) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-400 mb-4">Entry Not Found</h1>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-red-500/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-32 right-16 w-24 h-24 bg-purple-500/10 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-pink-500/10 rounded-full blur-xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Audio element */}
      <audio 
        ref={audioRef}
        src={entry.songUrl}
        loop
        preload="auto"
        className="hidden"
      />

      {/* Audio status indicator */}
      {!audioError && (
        <div className="absolute top-4 right-4 z-20">
          {audioLoaded ? (
            <div className="flex items-center space-x-2 bg-black/50 px-3 py-2 rounded-full backdrop-blur-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-300">Playing</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2 bg-black/50 px-3 py-2 rounded-full backdrop-blur-sm">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-300">Loading...</span>
            </div>
          )}
        </div>
      )}

      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <div className="polaroid-card bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-lg shadow-2xl max-w-md w-full border border-red-500/30 animate-float" style={{animationDelay: '1s'}}>
          {/* Tape effects */}
          <div className="absolute -top-3 left-8 w-16 h-6 bg-gray-600/80 rounded-sm rotate-12 shadow-lg"></div>
          <div className="absolute -top-2 right-12 w-12 h-5 bg-gray-700/80 rounded-sm -rotate-6 shadow-lg"></div>
          
          {/* Photo area */}
          <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-6 rounded-lg mb-4 relative overflow-hidden border-2 border-gray-600/50">
            <img 
              src={entry.photo} 
              alt={entry.caption}
              className="w-full h-80 object-cover object-center rounded filter brightness-95 contrast-105 border border-gray-500/30"
              style={{
                objectPosition: entry.code === 'HACK02' ? 'center 20%' : 
                               entry.code === 'LIPS05' ? 'center 30%' : 
                               entry.code === 'SUIT04' ? 'center 25%' :
                               entry.code === 'CAKE03' ? 'center 40%' :
                               'center center'
              }}
            />
            
            {/* Decorative circles */}
            <div className="absolute top-3 right-3 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <div className="absolute bottom-3 left-3 w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
          
          {/* Caption */}
          <div className="text-xl text-gray-300 font-handwriting leading-relaxed mb-6">
            {entry.caption.split('\n').map((line, index) => (
              <p key={index} className="mb-2">
                {line}
              </p>
            ))}
          </div>
          
          {/* Back button */}
          <button 
            onClick={() => navigate('/')}
            className="w-full py-3 bg-gradient-to-r from-red-600 to-purple-600 text-white font-display rounded-lg hover:from-red-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            ← Back to XO
          </button>
        </div>
      </div>
    </div>
  );
}
