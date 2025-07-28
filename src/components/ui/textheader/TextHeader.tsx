'use client';
import React, { useEffect, useState } from 'react';

interface TextHeadingProps {
  title: string;
  icon?: string;
  icon2?: string;
}

const TextHeading: React.FC<{ title: string; icon?: React.ReactNode; icon2?: React.ReactNode }> = ({ title, icon, icon2 }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);

  return (
    <div className={`flex justify-between p-6 text-center transition-all duration-700 ease-out ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}>

      {/* Traffic lights style indicators */}
      <div className="flex mt-1 space-x-2 justify-center align-center">
        <span className='w-3 h-3 rounded-2xl bg-red-500'></span>
        <span className='w-3 h-3 rounded-2xl bg-yellow-500'></span>
        <span className='w-3 h-3 rounded-2xl bg-green-500'></span>
      </div>


      {/* Gradient Heading */}
      <div className="flex items-center space-x-2">
        {icon && <span className="text-xl ">{icon}</span>}
        {icon2 && <span className="text-xl ">{icon2}</span>}
      <h1 className="text-2xl md:text-2xl font-extrabold uppercase bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-sm tracking-wide">
        {title}
      </h1>
      </div>
    </div>
  );
};

export default TextHeading;
