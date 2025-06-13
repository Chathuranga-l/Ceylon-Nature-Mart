import React, { ReactNode, useEffect } from 'react';
import CloseIconComponent from './icons/CloseIconComponent';
import { THEME_COLORS } from '../constants';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg'; // Added size prop
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, size = 'md' }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose} // Close on backdrop click
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className={`bg-[${THEME_COLORS.backgroundCream}] rounded-lg shadow-xl flex flex-col w-full ${sizeClasses[size]} overflow-hidden`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal content
      >
        <div className={`flex justify-between items-center p-4 border-b border-[${THEME_COLORS.accentBeige}]`}>
          <h2 id="modal-title" className={`font-serif-display text-xl font-semibold text-[${THEME_COLORS.textBrown}]`}>{title}</h2>
          <button 
            onClick={onClose} 
            className={`text-[${THEME_COLORS.textBrown}] hover:text-[${THEME_COLORS.primaryGreen}] transition-colors`}
            aria-label="Close modal"
          >
            <CloseIconComponent className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(100vh-10rem)]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
