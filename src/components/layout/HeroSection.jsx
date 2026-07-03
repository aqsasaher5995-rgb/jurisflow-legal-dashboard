import React, { useState, useEffect } from 'react';
import { GiScales } from 'react-icons/gi';
import { FaGavel, FaUsers, FaFileAlt, FaCheckCircle } from 'react-icons/fa';

const HeroSection = ({ stats }) => {
  const [showContent, setShowContent] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [typewriterComplete, setTypewriterComplete] = useState(false);

  const fullText = 'Welcome to JurisFlow';
  const subtitleText = 'Streamline your legal practice with our comprehensive case management system.';

  // Typewriter effect for main text
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 80);
      return () => clearTimeout(timer);
    } else {
      setTypewriterComplete(true);
      setTimeout(() => setShowSubtitle(true), 400);
      setTimeout(() => setShowStats(true), 1200);
    }
  }, [currentIndex]);

  // Show content after component mounts
  useEffect(() => {
    setShowContent(true);
  }, []);

  const statsData = [
    { 
      label: 'Total Cases', 
      value: stats?.total || 0, 
      icon: FaFileAlt,
      delay: 1800
    },
    { 
      label: 'Active Cases', 
      value: stats?.active || 0, 
      icon: FaGavel,
      delay: 2300
    },
    { 
      label: 'Clients', 
      value: 24, 
      icon: FaUsers,
      delay: 2800
    },
    { 
      label: 'Closed', 
      value: stats?.closed || 0, 
      icon: FaCheckCircle,
      delay: 3300
    },
  ];

  return (
    <div className="relative w-full h-[500px] sm:h-[560px] overflow-hidden">
      {/* Background Image - Full coverage with no gaps */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/court-bg.jpg")',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        {/* Dark Overlay with gradient - ensures text is readable */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-black/75 via-black/60 to-black/75"></div>
        
        {/* Additional bottom gradient for smoother transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center px-4 text-center z-10">
        {/* Icon with animation */}
        <div 
          className={`mb-4 transition-all duration-1000 transform ${
            showContent ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="inline-block p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl hover:shadow-[#4f46e5]/30 transition-all duration-500 hover:scale-110">
            <GiScales className="text-white text-5xl sm:text-6xl" />
          </div>
        </div>

        {/* Main Heading with Typewriter Effect */}
        <div className="mb-3 min-h-[70px]">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              {displayText}
            </span>
            {!typewriterComplete && (
              <span className="animate-pulse text-blue-400 ml-1">|</span>
            )}
          </h1>
        </div>

        {/* Subtitle with fade-in */}
        <div 
          className={`transition-all duration-1000 transform ${
            showSubtitle ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
          }`}
        >
          <p className="text-sm sm:text-base md:text-lg text-blue-200/90 max-w-2xl mb-6 leading-relaxed">
            {subtitleText}
          </p>
        </div>

        {/* Stats with staggered animation */}
        <div 
          className={`grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl w-full transition-all duration-1000 transform ${
            showStats ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          {statsData.map((stat, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#4f46e5]/20"
            >
              <stat.icon className="text-blue-300 text-lg sm:text-xl mx-auto mb-1" />
              <AnimatedCounter value={stat.value} delay={stat.delay} />
              <div className="text-[10px] sm:text-xs text-blue-200 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Animated Counter Component
const AnimatedCounter = ({ value, delay }) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStarted(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let start = 0;
    const duration = 1500;
    const increment = Math.max(1, Math.floor(value / 30));
    const stepTime = duration / 30;
    
    const interval = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, stepTime);
    
    return () => clearInterval(interval);
  }, [started, value]);

  return <div className="text-xl sm:text-2xl font-bold text-white">{count}</div>;
};

export default HeroSection;