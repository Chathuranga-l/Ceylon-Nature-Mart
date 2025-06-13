import React from 'react';
import { THEME_COLORS, ProductCategory } from '../constants';

interface MobileMenuProps {
  isOpen: boolean;
  onNavigate: (sectionId: string, category?: ProductCategory | null | undefined) => void;
}

const navLinks = [
  { id: 'home', label: 'Home', category: undefined },
  { id: 'products', label: 'Products', category: null },
  { id: 'about', label: 'About Us', category: undefined },
  { id: 'contact', label: 'Contact', category: undefined },
];

const authLinks = [
  { id: 'login', label: 'Login' },
  { id: 'signup', label: 'Sign Up' },
];

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onNavigate }) => {
  if (!isOpen) {
    return null;
  }

  const linkBaseStyle = `block px-3 py-2 rounded-md text-base font-medium text-[${THEME_COLORS.textBrown}] hover:bg-[${THEME_COLORS.accentBeige}] hover:text-[${THEME_COLORS.primaryGreen}]`;

  return (
    <div 
      className={`md:hidden absolute top-full left-0 right-0 bg-[${THEME_COLORS.backgroundCream}] shadow-lg py-2 z-30 border-t border-[${THEME_COLORS.accentBeige}]`}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="mobile-menu-button"
    >
      <div className="px-2 pt-2 pb-3 space-y-1">
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(link.id, link.category);
            }}
            className={linkBaseStyle}
            role="menuitem"
          >
            {link.label}
          </a>
        ))}
        {/* Divider */}
        <hr className={`border-[${THEME_COLORS.accentBeige}] my-2`} />
        {authLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => {
              onNavigate(link.id); // This will now call onLoginClick/onSignUpClick via handleNavigation in Header
            }}
            className={`${linkBaseStyle} w-full text-left`}
            role="menuitem"
          >
            {link.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileMenu;
