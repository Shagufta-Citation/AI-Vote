
import React from 'react';
import { CategoryType, AVAILABLE_THEMES } from '../types';

interface FilterControlsProps {
  onThemeChange: (theme: string) => void;
  onCategoryChange: (category: CategoryType | 'All') => void;
  currentTheme: string;
  currentCategory: CategoryType | 'All';
}

const FilterControls: React.FC<FilterControlsProps> = ({
  onThemeChange,
  onCategoryChange,
  currentTheme,
  currentCategory,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Category Filter */}
      <div className="flex-1 min-w-[170px]">
        <label htmlFor="category-filter" className="sr-only">
          Filter by Category
        </label>
        <select
          id="category-filter"
          value={currentCategory}
          onChange={(e) => onCategoryChange(e.target.value as CategoryType | 'All')}
          className="w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm bg-white"
          aria-label="Filter by category"
        >
          <option value="All">All Categories</option>
          {Object.values(CategoryType).map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Theme Filter */}
      <div className="flex-1 min-w-[170px]">
        <label htmlFor="theme-filter" className="sr-only">
           Filter by Theme
        </label>
        <select
          id="theme-filter"
          value={currentTheme}
          onChange={(e) => onThemeChange(e.target.value)}
          className="w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm bg-white"
          aria-label="Filter by theme"
        >
          <option value="All">All Themes</option>
          {AVAILABLE_THEMES.map((theme) => (
            <option key={theme} value={theme}>
              {theme}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterControls;
