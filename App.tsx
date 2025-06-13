import React, { useState, useMemo, useCallback } from 'react';
import Header from './components/Header';
import SubNavbar from './components/SubNavbar';
import Footer from './components/Footer';
import ProductCard from './components/ProductCard';
import CategoryCard from './components/CategoryCard';
import CartView from './components/CartView';
import LoginModal from './components/LoginModal';
import SignUpModal from './components/SignUpModal';
import FilterModal from './components/FilterModal';
import Carousel from './components/Carousel';
import { CartProvider } from './context/CartContext';
import { PRODUCTS_DATA, CATEGORIES_DATA, MOCK_REVIEWS, NEWSLETTER_PROMO, SHIPPING_INFO_TEXT, COMPANY_INFO, THEME_COLORS, HERO_SLIDES } from './constants';
import { Product, ProductCategory, FilterOptions } from './types';
import WhatsAppIconComponent from './components/icons/WhatsAppIconComponent';
import FilterIconComponent from './components/icons/FilterIconComponent';

const App: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null);
  
  const initialFilterOptions: FilterOptions = {
    minPrice: '',
    maxPrice: '',
    minRating: 0,
    featuredOnly: false,
  };
  const [activeFilters, setActiveFilters] = useState<FilterOptions>(initialFilterOptions);

  const handleCartClick = useCallback(() => setIsCartOpen(true), []);
  const handleCloseCart = useCallback(() => setIsCartOpen(false), []);

  const handleOpenLoginModal = useCallback(() => { setIsLoginModalOpen(true); setIsSignUpModalOpen(false); }, []);
  const handleCloseLoginModal = useCallback(() => setIsLoginModalOpen(false), []);
  
  const handleOpenSignUpModal = useCallback(() => { setIsSignUpModalOpen(true); setIsLoginModalOpen(false); }, []);
  const handleCloseSignUpModal = useCallback(() => setIsSignUpModalOpen(false), []);

  const handleOpenFilterModal = useCallback(() => setIsFilterModalOpen(true), []);
  const handleCloseFilterModal = useCallback(() => setIsFilterModalOpen(false), []);

  const handleApplyFilters = useCallback((filters: FilterOptions) => {
    setActiveFilters(filters);
  }, []);

  const handleClearFilters = useCallback(() => {
    setActiveFilters(initialFilterOptions);
  }, []);
  
  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }, []);

  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      const headerOffset = 128; // Header + SubNavbar height
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const handleCategorySelect = useCallback((categoryName: ProductCategory | null) => {
    setSelectedCategory(categoryName);
    smoothScrollTo('products');
  }, []);
  
  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter(product => {
      const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
      
      const price = product.priceUSD;
      const minPrice = parseFloat(activeFilters.minPrice);
      const maxPrice = parseFloat(activeFilters.maxPrice);
      const matchesMinPrice = activeFilters.minPrice === '' || isNaN(minPrice) || price >= minPrice;
      const matchesMaxPrice = activeFilters.maxPrice === '' || isNaN(maxPrice) || price <= maxPrice;
      
      const matchesRating = activeFilters.minRating === 0 || (product.rating && product.rating >= activeFilters.minRating);
      const matchesFeatured = !activeFilters.featuredOnly || product.featured;

      return matchesSearchTerm && matchesCategory && matchesMinPrice && matchesMaxPrice && matchesRating && matchesFeatured;
    });
  }, [searchTerm, selectedCategory, activeFilters]);

  const featuredProducts = useMemo(() => PRODUCTS_DATA.filter(p => p.featured).slice(0, 8), []); // Increased for carousel

  const renderHeroSlide = (slide: typeof HERO_SLIDES[0]) => (
    <div 
      key={slide.id} 
      className="h-full w-full bg-cover bg-center flex items-center justify-center text-white relative" 
      style={{backgroundImage: `url('${slide.imageUrl}')`}}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="relative z-10 p-8 md:p-12 rounded-lg text-center">
        <h2 className="font-serif-display text-4xl md:text-6xl font-bold mb-4">{slide.title}</h2>
        <p className="text-xl md:text-2xl mb-6">{slide.subtitle}</p>
        <a 
          href="#products"
          onClick={(e) => { e.preventDefault(); handleCategorySelect(null); }}
          className={`bg-[${THEME_COLORS.primaryGreen}] hover:bg-[${THEME_COLORS.darkerGreen}] text-white font-semibold py-3 px-8 rounded-md text-lg transition duration-150`}
        >
          Shop Now
        </a>
      </div>
    </div>
  );

  const renderFeaturedProduct = (product: Product) => (
    <ProductCard key={product.id} product={product} />
  );

  const getActiveFiltersSummary = () => {
    const parts = [];
    if (activeFilters.minPrice || activeFilters.maxPrice) {
      let priceStr = 'Price: ';
      if (activeFilters.minPrice) priceStr += `$${activeFilters.minPrice}`;
      if (activeFilters.minPrice && activeFilters.maxPrice) priceStr += ' - ';
      else if (!activeFilters.minPrice && activeFilters.maxPrice) priceStr += 'Up to ';
      if (activeFilters.maxPrice) priceStr += `$${activeFilters.maxPrice}`;
      parts.push(priceStr);
    }
    if (activeFilters.minRating > 0) parts.push(`Rating: ${activeFilters.minRating}+ Stars`);
    if (activeFilters.featuredOnly) parts.push('Best Sellers');
    return parts.length > 0 ? `Active Filters: ${parts.join(', ')}` : '';
  };


  return (
    <CartProvider>
      <div className={`min-h-screen flex flex-col bg-[${THEME_COLORS.backgroundCream}] text-[${THEME_COLORS.textBrown}]`}>
        <Header 
          onCartClick={handleCartClick} 
          onCategorySelect={handleCategorySelect}
          onLoginClick={handleOpenLoginModal}
          onSignUpClick={handleOpenSignUpModal}
        />
        <SubNavbar 
          searchTerm={searchTerm} 
          onSearchChange={handleSearchChange} 
          onCartClick={handleCartClick} 
        />
        
        <main className="flex-grow">
          {/* Hero Section Carousel */}
          <section id="home" className="h-[calc(100vh-8rem)] min-h-[450px]">
             <Carousel
                items={HERO_SLIDES}
                renderItem={renderHeroSlide}
                isHero={true}
                autoplay={true}
                showDots={true}
                showArrows={true}
              />
          </section>

          {/* Categories Section */}
          <section id="categories" className="py-12 md:py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 className={`font-serif-display text-3xl font-bold text-center mb-10 text-[${THEME_COLORS.textBrown}]`}>Explore Our Collections</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
                {CATEGORIES_DATA.map(category => (
                  <CategoryCard key={category.id} category={category} onClick={() => handleCategorySelect(category.name)} />
                ))}
              </div>
            </div>
          </section>

          {/* Featured Products Carousel Section */}
          <section id="featured-products" className={`py-12 md:py-16 bg-[${THEME_COLORS.accentBeige}]`}>
            <div className="container mx-auto px-4">
              <h2 className={`font-serif-display text-3xl font-bold text-center mb-10 text-[${THEME_COLORS.textBrown}]`}>Best Sellers</h2>
              <Carousel
                items={featuredProducts}
                renderItem={renderFeaturedProduct}
                itemsToShow={4} // Adjust based on desired look and ProductCard width
                itemWidth={300} // Approximate ProductCard width + gap for calculation. Actual sizing is handled by flex basis in Carousel.
                showArrows={true}
                className="pb-4" // Add some padding for shadow visibility if cards have shadows
              />
            </div>
          </section>

          {/* All Products Section */}
          <section id="products" className="py-12 md:py-16">
            <div className="container mx-auto px-4">
              <h2 className={`font-serif-display text-3xl font-bold text-center mb-4 text-[${THEME_COLORS.textBrown}]`}>
                {selectedCategory ? `${selectedCategory} Collection` : 'Our Products'}
              </h2>
              <div className="mb-6 flex flex-col sm:flex-row justify-center items-center gap-3">
                <button
                  onClick={handleOpenFilterModal}
                  className={`flex items-center gap-2 bg-[${THEME_COLORS.primaryGreen}] text-white px-4 py-2.5 rounded-md hover:bg-[${THEME_COLORS.darkerGreen}] transition-colors text-sm font-semibold`}
                >
                  <FilterIconComponent className="w-5 h-5"/>
                  Filters
                </button>
                {selectedCategory && (
                   <button 
                    onClick={() => handleCategorySelect(null)}
                    className={`bg-gray-200 text-[${THEME_COLORS.textBrown}] px-4 py-2.5 rounded-md hover:bg-gray-300 transition-colors text-sm`}
                  >
                    Clear Category: {selectedCategory} <span aria-hidden="true">×</span>
                  </button>
                )}
              </div>
              <div className="text-center text-sm text-gray-600 mb-8 min-h-[1.25rem]">
                  {getActiveFiltersSummary()}
              </div>

              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-lg text-gray-500 py-10">No products found matching your criteria.</p>
              )}
            </div>
          </section>

          {/* About Us Section */}
          <section id="about" className="py-12 md:py-16 bg-white">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <img src="https://picsum.photos/seed/aboutus/600/400" alt="Lush tea plantations in Sri Lanka, representing Ceylon Nature Mart's source." className="rounded-lg shadow-xl w-full" />
              </div>
              <div className="md:w-1/2">
                <h2 className={`font-serif-display text-3xl font-bold mb-4 text-[${THEME_COLORS.textBrown}]`}>Why Choose Us?</h2>
                <p className="mb-4 text-lg">
                  At Ceylon Nature Mart, we are passionate about bringing the pristine goodness of Sri Lankan natural products to the world. 
                  Our island, historically known as Ceylon, is blessed with a rich biodiversity and ancient traditions of wellness.
                </p>
                <p className="mb-4">
                  We meticulously source our teas, spices, Ayurvedic herbs, and natural care ingredients directly from ethical growers and artisans who share our commitment to quality and sustainability. 
                  Experience the authentic taste and therapeutic benefits of products nurtured by nature.
                </p>
                 <a 
                  href={`https://wa.me/message/GPKBHECRXAZ3J1`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`inline-flex items-center gap-2 bg-[${THEME_COLORS.primaryGreen}] hover:bg-[${THEME_COLORS.darkerGreen}] text-white font-semibold py-2 px-6 rounded-md transition duration-150`}
                >
                  <WhatsAppIconComponent className="w-5 h-5"/>
                  Chat With Us
                </a>
              </div>
            </div>
          </section>

          {/* Customer Reviews Section */}
          <section id="reviews" className={`py-12 md:py-16 bg-[${THEME_COLORS.accentBeige}]`}>
            <div className="container mx-auto px-4">
              <h2 className={`font-serif-display text-3xl font-bold text-center mb-10 text-[${THEME_COLORS.textBrown}]`}>What Our Customers Say</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {MOCK_REVIEWS.slice(0,3).map(review => (
                  <div key={review.id} className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex items-center mb-2" aria-label={`Rating: ${review.rating} out of 5 stars`}>
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.975a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.387 2.46a1 1 0 00-.364 1.118l1.287 3.975c.3.921-.755 1.688-1.54 1.118l-3.387-2.461a1 1 0 00-1.175 0l-3.387 2.461c-.784.57-1.838-.197-1.539-1.118l1.287-3.975a1 1 0 00-.364-1.118L2.04 9.402c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69L9.049 2.927z" />
                        </svg>
                      ))}
                    </div>
                    <p className="italic text-gray-600 mb-3">"{review.text}"</p>
                    <p className={`font-semibold text-[${THEME_COLORS.textBrown}]`}>- {review.author}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Shipping Info Section */}
          <section className="py-12 md:py-16 bg-white">
            <div className="container mx-auto px-4 text-center">
                <h2 className={`font-serif-display text-3xl font-bold mb-4 text-[${THEME_COLORS.textBrown}]`}>Shipping Information</h2>
                <p className="text-lg max-w-2xl mx-auto mb-2">{SHIPPING_INFO_TEXT.policy}</p>
                <p className="text-sm text-gray-500 max-w-2xl mx-auto">{SHIPPING_INFO_TEXT.calculatorNote}</p>
            </div>
          </section>

          {/* Newsletter Signup Section */}
          <section id="contact" className={`py-12 md:py-16 bg-[${THEME_COLORS.primaryGreen}] text-white`}>
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-serif-display text-3xl font-bold mb-3">{NEWSLETTER_PROMO}</h2>
              <p className="mb-6 text-lg">Subscribe to our newsletter for exclusive updates and offers.</p>
              <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3" onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing! (This is a demo feature)');}}>
                <label htmlFor="newsletter-email" className="sr-only">Email for newsletter</label>
                <input 
                  id="newsletter-email"
                  type="email" 
                  placeholder="Enter your email" 
                  className={`flex-grow py-3 px-4 rounded-md text-[${THEME_COLORS.textBrown}] focus:outline-none focus:ring-2 focus:ring-[${THEME_COLORS.backgroundCream}]`}
                  required 
                  aria-required="true"
                />
                <button 
                  type="submit"
                  className={`bg-[${THEME_COLORS.textBrown}] hover:bg-opacity-80 text-white font-semibold py-3 px-6 rounded-md transition duration-150`}
                >
                  Subscribe
                </button>
              </form>
            </div>
          </section>
        </main>
        
        <Footer />
        <CartView isOpen={isCartOpen} onClose={handleCloseCart} />
        <LoginModal 
          isOpen={isLoginModalOpen} 
          onClose={handleCloseLoginModal} 
          onSwitchToSignUp={handleOpenSignUpModal} 
        />
        <SignUpModal 
          isOpen={isSignUpModalOpen} 
          onClose={handleCloseSignUpModal} 
          onSwitchToLogin={handleOpenLoginModal}
        />
        <FilterModal
          isOpen={isFilterModalOpen}
          onClose={handleCloseFilterModal}
          currentFilters={activeFilters}
          onApplyFilters={handleApplyFilters}
          onClearFilters={handleClearFilters}
        />
      </div>
    </CartProvider>
  );
};

export default App;
