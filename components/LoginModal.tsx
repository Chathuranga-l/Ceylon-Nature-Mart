import React, { useState } from 'react';
import Modal from './Modal';
import { THEME_COLORS } from '../constants';
import EyeIconComponent from './icons/EyeIconComponent';
import EyeSlashIconComponent from './icons/EyeSlashIconComponent';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignUp: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSwitchToSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login logic
    alert(`Login attempt with Email: ${email}`);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Login to Your Account">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="login-email" className={`block text-sm font-medium text-[${THEME_COLORS.textBrown}]`}>
            Email Address
          </label>
          <input
            type="email"
            id="login-email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[${THEME_COLORS.primaryGreen}] focus:border-[${THEME_COLORS.primaryGreen}] sm:text-sm bg-white text-[${THEME_COLORS.textBrown}]`}
          />
        </div>
        <div>
          <label htmlFor="login-password" className={`block text-sm font-medium text-[${THEME_COLORS.textBrown}]`}>
            Password
          </label>
          <div className="relative mt-1">
            <input
              type={showPassword ? 'text' : 'password'}
              id="login-password"
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
        <div className="flex items-center justify-between">
          <a href="#" className={`text-sm text-[${THEME_COLORS.primaryGreen}] hover:underline`}>
            Forgot your password?
          </a>
        </div>
        <div>
          <button
            type="submit"
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[${THEME_COLORS.primaryGreen}] hover:bg-[${THEME_COLORS.darkerGreen}] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[${THEME_COLORS.primaryGreen}] transition-colors`}
          >
            Login
          </button>
        </div>
        <p className="text-sm text-center">
          Don't have an account?{' '}
          <button type="button" onClick={onSwitchToSignUp} className={`font-medium text-[${THEME_COLORS.primaryGreen}] hover:underline`}>
            Sign Up
          </button>
        </p>
      </form>
    </Modal>
  );
};

export default LoginModal;
