
import React from 'react';
import { COMPANY_INFO, SOCIAL_LINKS, SHIPPING_INFO_TEXT, THEME_COLORS } from '../constants';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`bg-[${THEME_COLORS.textBrown}] text-[${THEME_COLORS.backgroundCream}] py-12 mt-16`}>
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About/Contact Info */}
        <div>
          <h3 className="font-serif-display text-xl font-semibold mb-4 text-white">Ceylon Nature Mart</h3>
          <p className="text-sm mb-2">{COMPANY_INFO.address}</p>
          <p className="text-sm mb-2">Email: <a href={`mailto:${COMPANY_INFO.email}`} className={`hover:text-[${THEME_COLORS.primaryGreen}]`}>{COMPANY_INFO.email}</a></p>
          <p className="text-sm">Phone: <a href={`tel:${COMPANY_INFO.phone}`} className={`hover:text-[${THEME_COLORS.primaryGreen}]`}>{COMPANY_INFO.phone}</a></p>
        </div>

        {/* Quick Links / Shipping Info */}
        <div>
          <h3 className="font-serif-display text-xl font-semibold mb-4 text-white">Shipping & Policies</h3>
          <p className="text-sm mb-2">{SHIPPING_INFO_TEXT.policy}</p>
          <ul className="text-sm space-y-1">
            <li><a href="#privacy" className={`hover:text-[${THEME_COLORS.primaryGreen}]`}>Privacy Policy</a></li>
            <li><a href="#terms" className={`hover:text-[${THEME_COLORS.primaryGreen}]`}>Terms of Service</a></li>
            <li><a href="#returns" className={`hover:text-[${THEME_COLORS.primaryGreen}]`}>Return Policy</a></li>
          </ul>
        </div>

        {/* Social Media & Newsletter Teaser */}
        <div>
          <h3 className="font-serif-display text-xl font-semibold mb-4 text-white">Connect With Us</h3>
          <div className="flex space-x-4 mb-4">
            <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className={`hover:text-[${THEME_COLORS.primaryGreen}] text-2xl`}>FB</a>
            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className={`hover:text-[${THEME_COLORS.primaryGreen}] text-2xl`}>IG</a>
            <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" className={`hover:text-[${THEME_COLORS.primaryGreen}] text-2xl`}>TW</a>
          </div>
          <p className="text-sm">Stay updated with our latest products and offers!</p>
          {/* Newsletter signup form can be linked here or be a modal */}
        </div>
      </div>
      <div className={`mt-8 pt-8 border-t border-[${THEME_COLORS.accentBeige}] opacity-50 text-center text-sm`}>
        <p>Design & Created By Lasith Chathuranga</p>
        <p>&copy; {currentYear} Ceylon Nature Mart. All Rights Reserved.</p>
        <p>Pure Ceylon Wellness – Shipped Worldwide 🌍</p>
      </div>
    </footer>
  );
};

export default Footer;
