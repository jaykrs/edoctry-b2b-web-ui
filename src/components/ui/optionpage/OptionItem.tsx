'use client';
import React from 'react';

interface OptionItemProps {
  icon: string;
  name: string;
  author?: string;
  pagepath: string;
  isSelected?: boolean;
  onClick?: () => void;
}

const OptionItem: React.FC<OptionItemProps> = ({ icon, name, author, pagepath, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between p-4 rounded-xl shadow cursor-pointer transition-all duration-300
        ${isSelected ? 'bg-gradient-to-r from-indigo-100 to-purple-100 border border-indigo-300' : 'bg-white hover:bg-gray-100'}`}
    >
      <div className="flex items-center space-x-4">
        <div className="text-2xl">{icon}</div>
        <div>
          <div className="text-sm font-semibold text-gray-800">{name}</div>
          <div className="text-xs text-gray-400">
            {pagepath?.length > 0 ? pagepath : `by ${author}`}
          </div>
        </div>


      </div>
      <div className="text-lg text-gray-400">{'›'}</div>
    </div>
  );
};

export default OptionItem;
