
import React from 'react';
import { Product, Currency } from '../types';
import { useCart } from '../context/CartContext';
import { THEME_COLORS, MOCK_EXCHANGE_RATES } from '../constants';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, selectedCurrency } = useCart();

  const displayPrice = (priceUSD: number, currency: Currency): string => {
    const rate = MOCK_EXCHANGE_RATES[currency] / MOCK_EXCHANGE_RATES[Currency.USD];
    return (priceUSD * rate).toFixed(2);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all hover:scale-105 duration-300 ease-in-out flex flex-col">
      <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-serif-display text-xl font-semibold text-[#5D4037] mb-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-3 flex-grow">{product.description}</p>
        <div className="flex items-center mb-3">
          {product.rating && (
            <>
              {[...Array(5)].map((_, i) => (
                <svg key={i} className={`w-4 h-4 ${i < product.rating! ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.975a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.387 2.46a1 1 0 00-.364 1.118l1.287 3.975c.3.921-.755 1.688-1.54 1.118l-3.387-2.461a1 1 0 00-1.175 0l-3.387 2.461c-.784.57-1.838-.197-1.539-1.118l1.287-3.975a1 1 0 00-.364-1.118L2.04 9.402c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69L9.049 2.927z" />
                </svg>
              ))}
              <span className="text-xs text-gray-500 ml-1">({product.reviews || 0} reviews)</span>
            </>
          )}
        </div>
        <div className="flex justify-between items-center mt-auto">
          <p className="text-lg font-bold text-[${THEME_COLORS.primaryGreen}]">
            {selectedCurrency} {displayPrice(product.priceUSD, selectedCurrency)}
          </p>
          <button
            onClick={() => addToCart(product)}
            className={`bg-[${THEME_COLORS.primaryGreen}] hover:bg-[${THEME_COLORS.darkerGreen}] text-white font-semibold py-2 px-4 rounded-md transition duration-150 ease-in-out text-sm`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
