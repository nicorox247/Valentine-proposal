import React, { useState, useEffect } from 'react';
import { Heart, Gift, Sparkles } from 'lucide-react';

export default function App() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [yesButtonSize, setYesButtonSize] = useState(1);
  const [noButtonPos, setNoButtonPos] = useState(null); // New state for button position

  const handleNoClick = () => {
    setNoCount(noCount + 1);
    setYesButtonSize(yesButtonSize * 1.5);
  };

  const getNoButtonText = () => {
    const phrases = [
      "No",
      "Are you sure?",
      "Really sure?",
      "Think again!",
      "Last chance!",
      "Surely not?",
      "You might regret this!",
      "Give it another thought!",
      "Are you absolutely certain?",
      "This could be a mistake!",
      "Have a heart!",
      "Don't be so cold!",
      "Change of heart?",
      "Wouldn't you reconsider?",
      "Is that your final answer?",
      "You're breaking my heart ;(",
      "Is that a no?",
    ];
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  // Logic to move the button randomly within a safe sub-boundary
  const moveNoButton = () => {
    // Check if the device has a mouse (hover capability)
    const isMouseDevice = window.matchMedia('(pointer: fine)').matches;

    if (isMouseDevice) {
      // 1. Define the safe padding (10% of screen size)
      const xPadding = window.innerWidth * 0.3;
      const yPadding = window.innerHeight * 0.3;

      // 2. Estimated maximum button dimensions 
      // (This ensures the right/bottom edge of the button doesn't cross the line)
      const buttonWidth = 250; 
      const buttonHeight = 80;

      // 3. Calculate the available "safe" area to spawn in
      // Screen Width - (Left + Right Padding) - Button Width itself
      const randomRangeX = window.innerWidth - (xPadding * 2) - buttonWidth;
      const randomRangeY = window.innerHeight - (yPadding * 2) - buttonHeight;

      // 4. Generate random coordinates within that inner box
      // Math.max(0, ...) ensures we don't break on very small screens
      const x = Math.random() * Math.max(0, randomRangeX) + xPadding;
      const y = Math.random() * Math.max(0, randomRangeY) + yPadding;

      setNoButtonPos({ position: 'fixed', top: y, left: x });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen h-screen overflow-hidden bg-pink-100 relative font-sans text-center select-none">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-10 left-10 text-4xl animate-bounce duration-[2000ms]">🧸</div>
        <div className="absolute top-20 right-20 text-3xl animate-bounce duration-[3000ms]">🍫</div>
        <div className="absolute bottom-10 left-20 text-4xl animate-pulse">❤️</div>
        <div className="absolute bottom-32 right-10 text-5xl animate-bounce duration-[4000ms]">🧸</div>
        <div className="absolute top-1/2 left-5 text-2xl rotate-12">💖</div>
        <div className="absolute top-1/3 right-1/4 text-4xl rotate-45">🍫</div>
        <div className="absolute bottom-1/4 left-1/3 text-3xl -rotate-12">🧸</div>
        
        {/* Dynamic scattered background elements */}
        {Array.from({ length: 20 }).map((_, i) => (
            <div 
                key={i}
                className="absolute text-pink-400"
                style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    fontSize: `${Math.random() * 20 + 10}px`,
                    transform: `rotate(${Math.random() * 360}deg)`,
                    opacity: 0.5
                }}
            >
                {['❤️', '💖', '💘', '💝'][Math.floor(Math.random() * 4)]}
            </div>
        ))}
      </div>

      {/* Main Content Card */}
      <div className="z-10 bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border-4 border-white max-w-md w-full mx-4 flex flex-col items-center gap-6 transition-all duration-300">
        
        {yesPressed ? (
          /* Success State */
          <div className="animate-in fade-in zoom-in duration-500 flex flex-col items-center">
            <img 
              src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif" 
              alt="Bears kissing" 
              className="w-48 h-48 object-contain mb-4"
            />
            <h1 className="text-3xl md:text-4xl font-bold text-pink-600 mb-4 flex items-center gap-2">
              Yayyy!! <Heart className="fill-red-500 text-red-500 animate-pulse" />
            </h1>
            <p className="text-xl text-gray-700 font-medium">
              I knew you would say yes! <br/> Love, Nick
            </p>
            <div className="mt-6 flex gap-2">
                <span className="text-4xl animate-bounce delay-100">🧸</span>
                <span className="text-4xl animate-bounce delay-200">❤️</span>
                <span className="text-4xl animate-bounce delay-300">🍫</span>
            </div>
          </div>
        ) : (
          /* Asking State */
          <>
            <img 
              src="https://media.tenor.com/K2sE98IqP_4AAAAi/cute-bear-jump.gif" 
              alt="Cute bear asking" 
              className="w-48 h-48 object-contain rounded-lg"
            />
            
            <h1 className="text-3xl font-bold text-pink-600 tracking-tight leading-tight">
              Will you be my Valentine?
            </h1>

            <div className="flex flex-wrap justify-center items-center gap-4 w-full mt-4 relative">
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-green-200"
                style={{ 
                    fontSize: `${yesButtonSize}rem`,
                    padding: `${yesButtonSize * 0.5 + 0.5}rem ${yesButtonSize + 1}rem`,
                    minWidth: '100px'
                }}
                onClick={() => setYesPressed(true)}
              >
                Yes
              </button>

              <button
                className={`bg-red-400 hover:bg-red-500 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-red-200 text-sm whitespace-nowrap ${noButtonPos ? 'z-50' : ''}`}
                style={noButtonPos ? noButtonPos : {}}
                onClick={handleNoClick}
                onMouseEnter={moveNoButton}
              >
                {getNoButtonText()}
              </button>
            </div>
          </>
        )}
      </div>

      <footer className="absolute bottom-4 text-pink-400 text-xs font-medium opacity-70">
        Made with love ❤️
      </footer>
    </div>
  );
}