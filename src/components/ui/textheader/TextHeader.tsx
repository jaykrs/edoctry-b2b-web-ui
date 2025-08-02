'use client';
import React, { useEffect, useState } from 'react';
import HoverPopover from '../popupbutton/HoverPopover';

interface TextHeadingProps {
  title: string;
  icon?: React.ReactNode;
  icon2?: React.ReactNode;
  buttonprops?: {
    buttonText: string;
    title: string;
    content: string;
  };
}

const TextHeading: React.FC<TextHeadingProps> = ({ title, icon, icon2, buttonprops }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);

  return (
    <div className={`flex justify-between items-center p-6 transition-all duration-700 ease-out ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}>

      <div className="flex items-center space-x-2">
        {icon && <span className="text-xl">{icon}</span>}
        {icon2 && <span className="text-xl">{icon2}</span>}
        <h1 className="text-2xl md:text-2xl font-extrabold uppercase bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-sm tracking-wide">
          {title}
        </h1>
      </div>

      {buttonprops && (
        <div>
          <HoverPopover
            buttonText={buttonprops.buttonText}
            title={buttonprops.title}
            content={buttonprops.content}
          />
        </div>
      )}
    </div>
  );
};

export default TextHeading;
