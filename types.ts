export enum ProductCategory {
  TEA = "Tea",
  SPICES = "Spices",
  AYURVEDA = "Ayurveda",
  NATURAL_CARE = "Natural Care",
  GIFT_PACKS = "Gift Packs",
}

export interface Product {
  id: string;
  name: string;
  description: string;
  priceUSD: number;
  category: ProductCategory;
  imageUrl: string;
  rating?: number;
  reviews?: number;
  featured?: boolean; // To mark as "Best Seller" or "Tea of the Month"
}

export interface Category {
  id: string;
  name: ProductCategory;
  imageUrl: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export enum Currency {
  USD = "USD",
  EUR = "EUR",
  GBP = "GBP",
}

export interface ExchangeRates {
  [Currency.USD]: number;
  [Currency.EUR]: number;
  [Currency.GBP]: number;
}

export interface Review {
  id: string;
  author: string;
  text: string;
  rating: number;
}

export interface FilterOptions {
  minPrice: string;
  maxPrice: string;
  minRating: number; // 0 for any, or 1-5
  featuredOnly: boolean;
}
