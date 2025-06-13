import React, { useState, useCallback } from 'react';
import { THEME_COLORS, COMPANY_INFO } from '../constants';
import { ProductCategory } from '../types';
import WhatsAppIconComponent from './icons/WhatsAppIconComponent';
import MenuIconComponent from './icons/MenuIconComponent';
import CloseIconComponent from './icons/CloseIconComponent';
import MobileMenu from './MobileMenu';


interface HeaderProps {
  onCartClick: () => void;
  onCategorySelect: (category: ProductCategory | null) => void;
  onLoginClick: () => void;
  onSignUpClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCategorySelect, onLoginClick, onSignUpClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigation = useCallback((sectionId: string, category?: ProductCategory | null) => {
    if (sectionId === 'login') {
      onLoginClick();
      setIsMobileMenuOpen(false);
      return;
    }
    if (sectionId === 'signup') {
      onSignUpClick();
      setIsMobileMenuOpen(false);
      return;
    }

    if (sectionId === 'products') {
      onCategorySelect(category === undefined ? null : category);
    }
    const element = document.getElementById(sectionId);
    if (element) {
        const headerOffset = 128; // Combined height of Header (4.5rem) and SubNavbar (3.5rem) = 8rem = 128px
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }
    setIsMobileMenuOpen(false);
  }, [onCategorySelect, onLoginClick, onSignUpClick]);

  const navLinkBaseStyle = `py-2 px-3 rounded-md hover:bg-[${THEME_COLORS.accentBeige}] hover:text-[${THEME_COLORS.primaryGreen}] transition-colors text-sm font-medium`;
  const authButtonBaseStyle = "py-1.5 px-4 rounded-md text-sm font-semibold transition-colors duration-150";

  return (
    <header className={`bg-[${THEME_COLORS.backgroundCream}] shadow-md sticky top-0 z-40 h-[4.5rem] flex items-center`}>
      <div className="container mx-auto px-4 flex justify-between items-center w-full">
        <div className="flex items-center">
           
          <h1 
            className={`font-serif-display text-xl sm:text-3xl font-bold text-[${THEME_COLORS.primaryGreen}] cursor-pointer whitespace-nowrap`} 
            onClick={() => {
              onCategorySelect(null);
              document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
            }}
            aria-label="Ceylon Nature Mart, click to go to homepage"
          >
            Ceylon Nature Mart
          </h1>
        </div>
        
        <div className="flex items-center space-x-2 md:space-x-3 lg:space-x-4">
           {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <a href="#home" onClick={(e) => { e.preventDefault(); handleNavigation('home');}} className={`${navLinkBaseStyle} text-[${THEME_COLORS.textBrown}]`}>Home</a>
            <a href="#products" onClick={(e) => { e.preventDefault(); handleNavigation('products', null);}} className={`${navLinkBaseStyle} text-[${THEME_COLORS.textBrown}]`}>Products</a>
            <a href="#about" onClick={(e) => { e.preventDefault(); handleNavigation('about');}} className={`${navLinkBaseStyle} text-[${THEME_COLORS.textBrown}]`}>About Us</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavigation('contact');}} className={`${navLinkBaseStyle} text-[${THEME_COLORS.textBrown}]`}>Contact</a>
          </nav>
          
          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-2">
            <button
              onClick={() => onLoginClick()}
              className={`${authButtonBaseStyle} border border-[${THEME_COLORS.primaryGreen}] text-[${THEME_COLORS.primaryGreen}] hover:bg-[${THEME_COLORS.primaryGreen}] hover:text-white`}
              aria-label="Login to your account"
            >
              Login
            </button>
            <button
              onClick={() => onSignUpClick()}
              className={`${authButtonBaseStyle} bg-[${THEME_COLORS.primaryGreen}] text-white hover:bg-[${THEME_COLORS.darkerGreen}]`}
              aria-label="Sign up for an account"
            >
              Sign Up
            </button>
          </div>
          
          <a 
            href={`https://wa.me/message/GPKBHECRXAZ3J1${COMPANY_INFO.whatsapp}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`text-[${THEME_COLORS.primaryGreen}] hover:text-[${THEME_COLORS.darkerGreen}] transition-colors p-1 hidden sm:inline-block`}
            title="Chat on WhatsApp"
            aria-label="Chat on WhatsApp"
          >
            <WhatsAppIconComponent className="w-6 h-6 sm:w-7 sm:h-7" />
          </a>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className={`md:hidden text-[${THEME_COLORS.textBrown}] hover:text-[${THEME_COLORS.primaryGreen}] transition-colors p-1`}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            id="mobile-menu-button"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <CloseIconComponent className="w-6 h-6" /> : <MenuIconComponent className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {/* Mobile Menu Panel */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onNavigate={handleNavigation} 
      />
    </header>
  );
};

export default Header;
