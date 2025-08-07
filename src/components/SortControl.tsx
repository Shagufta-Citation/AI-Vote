
import React from 'react';
import { SortOption } from '../types';
import TrophyIcon from './icons/TrophyIcon';
import ClockIcon from './icons/ClockIcon';

interface SortControlProps {
  currentSort: SortOption;
  onSortChange: (sortOption: SortOption) => void;
}

const SortControl: React.FC<SortControlProps> = ({ currentSort, onSortChange }) => {
  const getButtonClasses = (option: SortOption) => {
    const baseClasses = 'flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500';
    if (currentSort === option) {
      return `${baseClasses} bg-indigo-600 text-white shadow`;
    }
    return `${baseClasses} bg-white text-gray-600 hover:bg-gray-100`;
  };

  return (
    <div className="flex justify-center space-x-2 bg-gray-200 p-1 rounded-lg mb-8">
      <button
        onClick={() => onSortChange(SortOption.POPULARITY)}
        className={getButtonClasses(SortOption.POPULARITY)}
      >
        <TrophyIcon className="w-5 h-5" />
        <span>Most Popular</span>
      </button>
      <button
        onClick={() => onSortChange(SortOption.NEWEST)}
        className={getButtonClasses(SortOption.NEWEST)}
      >
        <ClockIcon className="w-5 h-5" />
        <span>Newest</span>
      </button>
    </div>
  );
};

export default SortControl;
