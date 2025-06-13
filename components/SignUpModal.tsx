import React, { useState } from 'react';
import Modal from './Modal';
import { THEME_COLORS } from '../constants';
import EyeIconComponent from './icons/EyeIconComponent';
import EyeSlashIconComponent from './icons/EyeSlashIconComponent';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    // Mock sign up logic
    alert(`Sign Up attempt for ${fullName} with Email: ${email}`);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Your Account" size="lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="signup-fullname" className={`block text-sm font-medium text-[${THEME_COLORS.textBrown}]`}>
            Full Name
          </label>
          <input
            type="text"
            id="signup-fullname"
            name="fullname"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[${THEME_COLORS.primaryGreen}] focus:border-[${THEME_COLORS.primaryGreen}] sm:text-sm bg-white text-[${THEME_COLORS.textBrown}]`}
          />
        </div>
        <div>
          <label htmlFor="signup-email" className={`block text-sm font-medium text-[${THEME_COLORS.textBrown}]`}>
            Email Address
          </label>
          <input
            type="email"
            id="signup-email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[${THEME_COLORS.primaryGreen}] focus:border-[${THEME_COLORS.primaryGreen}] sm:text-sm bg-white text-[${THEME_COLORS.textBrown}]`}
          />
        </div>
        <div>
          <label htmlFor="signup-password" className={`block text-sm font-medium text-[${THEME_COLORS.textBrown}]`}>
            Password
          </label>
          <div className="relative mt-1">
            <input
              type={showPassword ? 'text' : 'password'}
              id="signup-password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[${THEME_COLORS.primaryGreen}] focus:border-[${THEME_COLORS.primaryGreen}] sm:text-sm bg-white text-[${THEME_COLORS.textBrown}]`}
            />
             <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeSlashIconComponent className={`h-5 w-5 text-[${THEME_COLORS.textBrown}]`} /> : <EyeIconComponent className={`h-5 w-5 text-[${THEME_COLORS.textBrown}]`} />}
            </button>
          </div>
        </div>
        <div>
          <label htmlFor="signup-confirm-password" className={`block text-sm font-medium text-[${THEME_COLORS.textBrown}]`}>
            Confirm Password
          </label>
           <div className="relative mt-1">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="signup-confirm-password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[${THEME_COLORS.primaryGreen}] focus:border-[${THEME_COLORS.primaryGreen}] sm:text-sm bg-white text-[${THEME_COLORS.textBrown}]`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? <EyeSlashIconComponent className={`h-5 w-5 text-[${THEME_COLORS.textBrown}]`} /> : <EyeIconComponent className={`h-5 w-5 text-[${THEME_COLORS.textBrown}]`} />}
            </button>
          </div>
        </div>
        <div>
          <button
            type="submit"
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[${THEME_COLORS.primaryGreen}] hover:bg-[${THEME_COLORS.darkerGreen}] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[${THEME_COLORS.primaryGreen}] transition-colors`}
          >
            Sign Up
          </button>
        </div>
        <p className="text-sm text-center">
          Already have an account?{' '}
          <button type="button" onClick={onSwitchToLogin} className={`font-medium text-[${THEME_COLORS.primaryGreen}] hover:underline`}>
            Login
          </button>
        </p>
      </form>
    </Modal>
  );
};

export default SignUpModal;
