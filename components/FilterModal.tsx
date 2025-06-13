import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { THEME_COLORS } from '../constants';
import { FilterOptions } from '../types';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentFilters: FilterOptions;
  onApplyFilters: (filters: FilterOptions) => void;
  onClearFilters: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ 
  isOpen, 
  onClose, 
  currentFilters, 
  onApplyFilters, 
  onClearFilters 
}) => {
  const [filters, setFilters] = useState<FilterOptions>(currentFilters);

  useEffect(() => {
    setFilters(currentFilters);
  }, [currentFilters, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFilters(prev => ({ ...prev, [name]: checked }));
    } else {
      setFilters(prev => ({ ...prev, [name]: name === 'minRating' ? parseInt(value) : value }));
    }
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleClear = () => {
    onClearFilters();
    // Optionally reset local state here if onClearFilters doesn't immediately update currentFilters prop
    // setFilters({ minPrice: '', maxPrice: '', minRating: 0, featuredOnly: false }); 
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Filter Products" size="md">
      <div className="space-y-6">
        {/* Price Range */}
        <div>
          <label className={`block text-sm font-medium text-[${THEME_COLORS.textBrown}] mb-1`}>Price Range (USD)</label>
          <div className="flex space-x-2">
            <input
              type="number"
              name="minPrice"
              placeholder="Min"
              value={filters.minPrice}
              onChange={handleChange}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[${THEME_COLORS.primaryGreen}] focus:border-[${THEME_COLORS.primaryGreen}] sm:text-sm bg-white text-[${THEME_COLORS.textBrown}]`}
            />
            <input
              type="number"
              name="maxPrice"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={handleChange}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[${THEME_COLORS.primaryGreen}] focus:border-[${THEME_COLORS.primaryGreen}] sm:text-sm bg-white text-[${THEME_COLORS.textBrown}]`}
            />
          </div>
        </div>

        {/* Minimum Rating */}
        <div>
          <label htmlFor="minRating" className={`block text-sm font-medium text-[${THEME_COLORS.textBrown}] mb-1`}>Minimum Rating</label>
          <select
            id="minRating"
            name="minRating"
            value={filters.minRating}
            onChange={handleChange}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[${THEME_COLORS.primaryGreen}] focus:border-[${THEME_COLORS.primaryGreen}] sm:text-sm bg-white text-[${THEME_COLORS.textBrown}]`}
          >
            <option value="0">Any Rating</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars & Up</option>
            <option value="3">3 Stars & Up</option>
            <option value="2">2 Stars & Up</option>
            <option value="1">1 Star & Up</option>
          </select>
        </div>

        {/* Featured Only */}
        <div className="flex items-center">
          <input
            id="featuredOnly"
            name="featuredOnly"
            type="checkbox"
            checked={filters.featuredOnly}
            onChange={handleChange}
            className={`h-4 w-4 text-[${THEME_COLORS.primaryGreen}] focus:ring-[${THEME_COLORS.darkerGreen}] border-gray-300 rounded`}
          />
          <label htmlFor="featuredOnly" className={`ml-2 block text-sm text-[${THEME_COLORS.textBrown}]`}>
            Show Best Sellers Only
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
          <button
            onClick={handleClear}
            className={`w-full sm:w-auto flex-1 justify-center py-2 px-4 border border-[${THEME_COLORS.primaryGreen}] rounded-md shadow-sm text-sm font-medium text-[${THEME_COLORS.primaryGreen}] hover:bg-[${THEME_COLORS.accentBeige}] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[${THEME_COLORS.primaryGreen}] transition-colors`}
          >
            Clear All Filters
          </button>
          <button
            onClick={handleApply}
            className={`w-full sm:w-auto flex-1 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[${THEME_COLORS.primaryGreen}] hover:bg-[${THEME_COLORS.darkerGreen}] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[${THEME_COLORS.primaryGreen}] transition-colors`}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default FilterModal;
