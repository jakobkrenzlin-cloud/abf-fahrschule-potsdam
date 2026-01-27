import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  targetDate: Date;
  className?: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, className = '' }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Clock className="w-5 h-5" />
      <span className="font-bold">Angebot endet in:</span>
      <div className="flex gap-1">
        <div className="bg-white/20 backdrop-blur-sm rounded px-2 py-1">
          <span className="font-bold text-lg">{timeLeft.days}</span>
          <span className="text-xs ml-1">Tage</span>
        </div>
        <div className="bg-white/20 backdrop-blur-sm rounded px-2 py-1">
          <span className="font-bold text-lg">{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className="text-xs ml-1">Std</span>
        </div>
        <div className="bg-white/20 backdrop-blur-sm rounded px-2 py-1">
          <span className="font-bold text-lg">{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className="text-xs ml-1">Min</span>
        </div>
        <div className="bg-white/20 backdrop-blur-sm rounded px-2 py-1 hidden sm:block">
          <span className="font-bold text-lg">{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span className="text-xs ml-1">Sek</span>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
