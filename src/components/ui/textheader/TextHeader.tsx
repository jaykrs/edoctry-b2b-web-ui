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
    content?: React.ReactNode;
    onClick?: () => void;
  };
  secondbuttonprops?: {
    buttonText: string;
    title: string;
    content?: React.ReactNode;
    onClick?: () => void;
  };
  savebuttonprops?: {
    buttonTitle: string;
    icon: string;
    onClick?: () => void;
  };
  thirdbuttonprops?: {
    buttonTitle: string;
    icon: string;
    onClick?: () => void;
  };

}

const TextHeading: React.FC<TextHeadingProps> = ({ title, icon, icon2, buttonprops, secondbuttonprops, savebuttonprops, thirdbuttonprops }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);

  return (
    <div className={`flex justify-between items-center p-6 transition-all duration-700 ease-out ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}>

      <div className="flex items-center space-x-2">
        {icon && <span className="text-xl">{icon}</span>}
        {icon2 && <span className="text-xl">{icon2}</span>}
        <h1 className="text-2xl md:text-2xl font-extrabold uppercase text-gray-600 dark:text-white">
          {title}
        </h1>
      </div>
      <div className='flex items-center'>
        <div>
          {buttonprops && (
            <div>
              <HoverPopover
                buttonText={buttonprops.buttonText}
                title={buttonprops.title}
                content={buttonprops.content}
                onClick={buttonprops.onClick}
              />
            </div>
          )}
        </div>
        <div>
          {secondbuttonprops && (
            <div>
              <HoverPopover
                buttonText={secondbuttonprops.buttonText}
                title={secondbuttonprops.title}
                content={secondbuttonprops.content}
                onClick={secondbuttonprops.onClick}
              />
            </div>
          )}
        </div>
        <div>
          {savebuttonprops && (
            <button
              onClick={savebuttonprops.onClick}
              className="ml-2 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium
               bg-green-300 text-gray-700 ring-1 ring-inset ring-gray-300
               hover:bg-green-500 transition"
              title={savebuttonprops.buttonTitle}
            >
              <span className="text-base">{savebuttonprops.icon}</span>
              <span>{savebuttonprops.buttonTitle}</span>
            </button>
          )}
        </div>
        <div>
          {thirdbuttonprops && (
            <button
              onClick={thirdbuttonprops.onClick}
              className="ml-2 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium
               bg-white text-gray-700 ring-1 ring-inset ring-gray-300
               hover:bg-gray-50 transition"
              title={thirdbuttonprops.buttonTitle}
            >
              <span className="text-base">{thirdbuttonprops.icon}</span>
              <span>{thirdbuttonprops.buttonTitle}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextHeading;
