import { Product, Category, ProductCategory, Currency, ExchangeRates, Review } from './types';

export const THEME_COLORS = {
  primaryGreen: '#4CAF50',
  backgroundCream: '#FAF3E0',
  textBrown: '#5D4037',
  accentBeige: '#F5E8C7',
  darkerGreen: '#388E3C',
};

export const CATEGORIES_DATA: Category[] = [
  { id: 'cat1', name: ProductCategory.TEA, imageUrl: 'https://picsum.photos/seed/tea/300/200', description: 'Finest Ceylon teas, from robust black teas to delicate green teas.' },
  { id: 'cat2', name: ProductCategory.SPICES, imageUrl: 'https://picsum.photos/seed/spices/300/200', description: 'Aromatic spices like cinnamon, pepper, and cardamom.' },
  { id: 'cat3', name: ProductCategory.AYURVEDA, imageUrl: 'https://picsum.photos/seed/ayurveda/300/200', description: 'Traditional Ayurvedic remedies and herbal wellness products.' },
  { id: 'cat4', name: ProductCategory.NATURAL_CARE, imageUrl: 'https://picsum.photos/seed/naturalcare/300/200', description: 'Handmade soaps, lotions, and beauty kits with natural ingredients.' },
  { id: 'cat5', name: ProductCategory.GIFT_PACKS, imageUrl: 'https://picsum.photos/seed/giftpacks/300/200', description: 'Curated gift packs for a touch of Ceylon wellness.' },
];

export const PRODUCTS_DATA: Product[] = [
  // Tea
  { id: 'prod1', name: 'Ceylon Black Tea (Premium)', description: 'Rich and robust, full-bodied black tea.', priceUSD: 12.99, category: ProductCategory.TEA, imageUrl: 'https://picsum.photos/seed/blacktea/400/300', rating: 5, reviews: 120, featured: true },
  { id: 'prod2', name: 'Organic Green Tea', description: 'Light and refreshing organic green tea leaves.', priceUSD: 15.50, category: ProductCategory.TEA, imageUrl: 'https://picsum.photos/seed/greentea/400/300', rating: 4, reviews: 85 },
  { id: 'prod3', name: 'Herbal Infusion Pack', description: 'A selection of soothing herbal teas.', priceUSD: 18.00, category: ProductCategory.TEA, imageUrl: 'https://picsum.photos/seed/herbaltea/400/300', featured: true, rating: 4, reviews: 50 },
  // Spices
  { id: 'prod4', name: 'True Cinnamon Sticks', description: 'Authentic Ceylon cinnamon sticks (Alba grade).', priceUSD: 9.75, category: ProductCategory.SPICES, imageUrl: 'https://picsum.photos/seed/cinnamon/400/300', rating: 5, reviews: 250, featured: true },
  { id: 'prod5', name: 'Black Pepper Corns', description: 'Whole black peppercorns, strong aroma.', priceUSD: 7.50, category: ProductCategory.SPICES, imageUrl: 'https://picsum.photos/seed/pepper/400/300', rating: 4, reviews: 60 },
  { id: 'prod6', name: 'Cardamom Pods (Green)', description: 'Fragrant green cardamom pods.', priceUSD: 11.20, category: ProductCategory.SPICES, imageUrl: 'https://picsum.photos/seed/cardamom/400/300', rating: 5, reviews: 90 },
  // Ayurveda
  { id: 'prod7', name: 'Ayurvedic Herbal Oil', description: 'Traditional herbal oil for massage and relief.', priceUSD: 22.00, category: ProductCategory.AYURVEDA, imageUrl: 'https://picsum.photos/seed/herbaloil/400/300', rating: 4, reviews: 70 },
  { id: 'prod8', name: 'Pain Relief Balm', description: 'Natural balm for aches and pains.', priceUSD: 10.50, category: ProductCategory.AYURVEDA, imageUrl: 'https://picsum.photos/seed/balm/400/300', featured: true, rating: 5, reviews: 110 },
  // Natural Care
  { id: 'prod9', name: 'Handmade Sandalwood Soap', description: 'Luxurious handmade soap with sandalwood.', priceUSD: 8.00, category: ProductCategory.NATURAL_CARE, imageUrl: 'https://picsum.photos/seed/sandalwoodsoap/400/300', rating: 4, reviews: 45 },
  { id: 'prod10', name: 'Aloe Vera Body Lotion', description: 'Soothing and moisturizing body lotion.', priceUSD: 14.00, category: ProductCategory.NATURAL_CARE, imageUrl: 'https://picsum.photos/seed/aloelotion/400/300', rating: 5, reviews: 75 },
  // Gift Packs
  { id: 'prod11', name: 'Tea Lover\'s Gift Set', description: 'A curated selection of our finest teas.', priceUSD: 35.00, category: ProductCategory.GIFT_PACKS, imageUrl: 'https://picsum.photos/seed/teagift/400/300', featured: true, rating: 5, reviews: 95 },
  { id: 'prod12', name: 'Spice Discovery Box', description: 'Explore the world of Ceylon spices.', priceUSD: 28.00, category: ProductCategory.GIFT_PACKS, imageUrl: 'https://picsum.photos/seed/spicegift/400/300', rating: 4, reviews: 65 },
];

export const CURRENCIES: Currency[] = [Currency.USD, Currency.EUR, Currency.GBP];

export const MOCK_EXCHANGE_RATES: ExchangeRates = {
  [Currency.USD]: 1,
  [Currency.EUR]: 0.92, // 1 USD = 0.92 EUR
  [Currency.GBP]: 0.79, // 1 USD = 0.79 GBP
};

export const MOCK_REVIEWS: Review[] = [
  { id: 'rev1', author: 'Alice M.', text: 'Absolutely love the quality of the spices! My cooking has improved so much.', rating: 5 },
  { id: 'rev2', author: 'John B. (Canada)', text: 'The herbal tea is so calming. Fast shipping too!', rating: 4 },
  { id: 'rev3', author: 'Priya K. (UK)', text: 'Reminds me of home. The natural care products are fantastic.', rating: 5 },
  { id: 'rev4', author: 'David S.', text: 'Great gift packs. My friends loved them!', rating: 5 },
];

export const COMPANY_INFO = {
  email: 'ceylonnaturemart@gamil.com',
  phone: '+94 788336914',
  address: '346/1 Rathnapura Batugedara',
  whatsapp: '+94 788336914'
};

export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/ceylonnaturemart',
  instagram: 'https://instagram.com/ceylonnaturemart',
  twitter: 'https://twitter.com/ceylonnaturemart',
};

export const SHIPPING_INFO_TEXT = {
  policy: "We ship worldwide using SL Post EMS, Aramex, or DHL. Delivery typically takes 7-15 working days. Enjoy flat $5 shipping for all orders over $50!",
  calculatorNote: "Shipping costs are calculated at checkout based on destination and weight. For orders over $50, a $5 flat rate applies."
};

export const NEWSLETTER_PROMO = "Get 10% Off Your First Order";

export const HERO_SLIDES = [
  { id: 'hero1', imageUrl: 'https://picsum.photos/seed/ceylonhero1/1200/800', title: "Discover Authentic Ceylon Flavors", subtitle: "Handpicked teas, spices, and more." },
  { id: 'hero2', imageUrl: 'https://picsum.photos/seed/ceylonhero2/1200/800', title: "Nature's Best, Delivered to You", subtitle: "Pure ingredients for a healthier lifestyle." },
  { id: 'hero3', imageUrl: 'https://picsum.photos/seed/ceylonhero3/1200/800', title: "Wellness Rooted in Tradition", subtitle: "Explore ancient Ayurvedic remedies." },
];


// Re-export ProductCategory so it can be imported from constants.ts
export { ProductCategory };
