import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ value, onChange, placeholder = 'Search cases...', className = '' }) => {
  return (
    <div className={`relative flex-1 max-w-xs w-full ${className}`}>
      <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-xl text-gray-200 placeholder:text-gray-500 focus:bg-[rgba(255,255,255,0.08)] focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/20 focus:outline-none transition-all duration-200"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchBar;