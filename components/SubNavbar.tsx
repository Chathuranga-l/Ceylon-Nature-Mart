import React from 'react';
import { useCart } from '../context/CartContext';
import { CURRENCIES, THEME_COLORS } from '../constants';
import { Currency } from '../types';
import CartIconComponent from './icons/CartIconComponent';
import ChevronDownIconComponent from './icons/ChevronDownIconComponent';
import SearchIconComponent from './icons/SearchIconComponent';

interface SubNavbarProps {
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCartClick: () => void;
}

const SubNavbar: React.FC<SubNavbarProps> = ({ searchTerm, onSearchChange, onCartClick }) => {
  const { selectedCurrency, setSelectedCurrency, getItemCount } = useCart();

  return (
    <nav className={`bg-[${THEME_COLORS.accentBeige}] shadow-sm sticky top-[4.5rem] z-30 h-[3.5rem] flex items-center`}>
      <div className="container mx-auto px-4 flex justify-between items-center w-full">
        {/* Search Bar */}
        <div className="relative flex-grow max-w-xl">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={onSearchChange}
            className={`w-full py-2 px-3 pl-10 border border-[${THEME_COLORS.primaryGreen}] rounded-md focus:outline-none focus:ring-1 focus:ring-[${THEME_COLORS.primaryGreen}] bg-white text-sm text-[${THEME_COLORS.textBrown}]`}
            aria-label="Search products"
          />
          <SearchIconComponent className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[${THEME_COLORS.primaryGreen}] pointer-events-none`} />
        </div>

        {/* Controls: Currency and Cart */}
        <div className="flex items-center space-x-2 sm:space-x-4 ml-4">
          <div className="relative">
            <select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value as Currency)}
              className={`bg-transparent border border-[${THEME_COLORS.primaryGreen}] text-[${THEME_COLORS.textBrown}] rounded-md py-1.5 px-2 sm:px-3 pr-6 sm:pr-8 focus:outline-none focus:ring-1 focus:ring-[${THEME_COLORS.primaryGreen}] appearance-none text-xs sm:text-sm`}
              aria-label="Select currency"
            >
              {CURRENCIES.map(currency => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
            <ChevronDownIconComponent className={`absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-[${THEME_COLORS.primaryGreen}] pointer-events-none`} />
          </div>

          <button
            onClick={onCartClick}
            className={`relative text-[${THEME_COLORS.textBrown}] hover:text-[${THEME_COLORS.primaryGreen}] transition-colors p-1`}
            aria-label="Open shopping cart"
          >
            <CartIconComponent className="w-6 h-6 sm:w-7 sm:h-7" />
            {getItemCount() > 0 && (
              <span className={`absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center`}>
                {getItemCount()}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default SubNavbar;