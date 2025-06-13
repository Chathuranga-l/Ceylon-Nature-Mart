
import React from 'react';
import { useCart } from '../context/CartContext';
import { Currency } from '../types';
import { THEME_COLORS, MOCK_EXCHANGE_RATES } from '../constants';
import CloseIconComponent from './icons/CloseIconComponent';

interface CartViewProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartView: React.FC<CartViewProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, selectedCurrency, clearCart } = useCart();

  const displayPrice = (priceUSD: number, currency: Currency): string => {
    const rate = MOCK_EXCHANGE_RATES[currency] / MOCK_EXCHANGE_RATES[Currency.USD];
    return (priceUSD * rate).toFixed(2);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-end z-50">
      <div className={`w-full max-w-md h-full bg-[${THEME_COLORS.backgroundCream}] shadow-xl flex flex-col`}>
        <div className={`flex justify-between items-center p-4 border-b border-[${THEME_COLORS.accentBeige}]`}>
          <h2 className={`font-serif-display text-2xl font-semibold text-[${THEME_COLORS.textBrown}]`}>Your Cart</h2>
          <button onClick={onClose} className={`text-[${THEME_COLORS.textBrown}] hover:text-[${THEME_COLORS.primaryGreen}]`}>
            <CloseIconComponent className="w-6 h-6" />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center p-6">
            <img src="https://picsum.photos/seed/emptycart/200/200" alt="Empty Cart" className="w-40 h-40 mb-4 rounded-full opacity-70" />
            <p className={`text-lg text-[${THEME_COLORS.textBrown}]`}>Your cart is empty.</p>
            <button
              onClick={onClose}
              className={`mt-4 bg-[${THEME_COLORS.primaryGreen}] hover:bg-[${THEME_COLORS.darkerGreen}] text-white font-semibold py-2 px-6 rounded-md transition duration-150`}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center bg-white p-3 rounded-lg shadow">
                  <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
                  <div className="flex-grow">
                    <h3 className={`text-md font-semibold text-[${THEME_COLORS.textBrown}]`}>{item.name}</h3>
                    <p className={`text-sm text-[${THEME_COLORS.primaryGreen}]`}>
                      {selectedCurrency} {displayPrice(item.priceUSD, selectedCurrency)}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className={`px-2 py-1 bg-gray-200 text-[${THEME_COLORS.textBrown}] rounded hover:bg-gray-300`}
                    >-</button>
                    <span className="px-3">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className={`px-2 py-1 bg-gray-200 text-[${THEME_COLORS.textBrown}] rounded hover:bg-gray-300`}
                    >+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className={`ml-4 text-red-500 hover:text-red-700`}>
                    <CloseIconComponent className="w-5 h-5"/>
                  </button>
                </div>
              ))}
            </div>

            <div className={`p-4 border-t border-[${THEME_COLORS.accentBeige}]`}>
              <div className="flex justify-between items-center mb-4">
                <span className={`text-lg font-semibold text-[${THEME_COLORS.textBrown}]`}>Total:</span>
                <span className={`text-xl font-bold text-[${THEME_COLORS.primaryGreen}]`}>
                  {selectedCurrency} {getCartTotal(selectedCurrency).toFixed(2)}
                </span>
              </div>
              <button 
                onClick={() => { alert('Checkout process is not implemented.'); onClose(); }}
                className={`w-full bg-[${THEME_COLORS.primaryGreen}] hover:bg-[${THEME_COLORS.darkerGreen}] text-white font-bold py-3 px-4 rounded-md transition duration-150`}
              >
                Proceed to Checkout
              </button>
              <button 
                onClick={() => { clearCart(); }}
                className={`w-full mt-2 border border-[${THEME_COLORS.primaryGreen}] text-[${THEME_COLORS.primaryGreen}] hover:bg-[${THEME_COLORS.primaryGreen}] hover:text-white font-semibold py-2 px-4 rounded-md transition duration-150`}
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartView;
