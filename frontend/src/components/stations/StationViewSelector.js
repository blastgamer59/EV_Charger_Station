import React from 'react';
import { LayoutGrid, List } from 'lucide-react';

const StationViewSelector = ({ currentView, onChange }) => {
  return (
    <div className="inline-flex shadow-sm rounded-md">
      <button
        type="button"
        className={`relative inline-flex items-center px-3 py-2 rounded-l-md border text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 ${
          currentView === 'card'
            ? 'bg-green-50 text-green-700 border-green-200'
            : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
        }`}
        onClick={() => onChange('card')}
        aria-label="Grid view"
      >
        <LayoutGrid size={16} className="mr-1" />
        Cards
      </button>
      <button
        type="button"
        className={`relative -ml-px inline-flex items-center px-3 py-2 rounded-r-md border text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 ${
          currentView === 'table'
            ? 'bg-green-50 text-green-700 border-green-200'
            : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
        }`}
        onClick={() => onChange('table')}
        aria-label="Table view"
      >
        <List size={16} className="mr-1" />
        Table
      </button>
    </div>
  );
};

export default StationViewSelector;
