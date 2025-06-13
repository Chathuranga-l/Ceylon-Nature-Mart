import { useState, useEffect, useCallback, ReactNode } from 'react';
import ChevronLeftIconComponent from './icons/ChevronLeftIconComponent';
import ChevronRightIconComponent from './icons/ChevronRightIconComponent';
import { THEME_COLORS } from '../constants';

interface CarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  itemWidth?: number; // For multi-item display, width of a single item in pixels
  itemsToShow?: number; // Number of items to show at once for multi-item display
  showDots?: boolean;
  showArrows?: boolean;
  autoplay?: boolean;
  autoplayInterval?: number;
  isHero?: boolean; // Special styling for hero carousel
  className?: string; // Additional classes for the carousel container
}

const Carousel = <T extends { id: string | number }>({
  items,
  renderItem,
  itemWidth,
  itemsToShow = 1,
  showDots = false,
  showArrows = true,
  autoplay = false,
  autoplayInterval = 5000,
  isHero = false,
  className = '',
}: CarouselProps<T>) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = items.length;

  const goToPrevious = useCallback(() => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? totalItems - itemsToShow : currentIndex - 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, totalItems, itemsToShow]);

  const goToNext = useCallback(() => {
    const isLastSlide = currentIndex >= totalItems - itemsToShow;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, totalItems, itemsToShow]);

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(() => {
        goToNext();
      }, autoplayInterval);
      return () => clearInterval(interval);
    }
  }, [autoplay, autoplayInterval, goToNext]);

  if (!totalItems) return null;

  const multiItemTransform = itemWidth ? `translateX(-${currentIndex * itemWidth}px)` : '';

  return (
    <div className={`relative overflow-hidden ${isHero ? 'h-full w-full' : ''} ${className}`}>
      {/* Slides Container */}
      <div 
        className={`flex transition-transform duration-700 ease-in-out ${isHero ? 'h-full' : ''}`}
        style={{ transform: isHero ? `translateX(-${currentIndex * 100}%)` : multiItemTransform, width: isHero ? `${totalItems * 100}%` : (itemWidth ? `${totalItems * itemWidth}px` : 'auto') }}
      >
        {items.map((item, index) => (
          <div 
            key={item.id} 
            className={`${isHero ? 'w-full flex-shrink-0 h-full' : ''}`}
            style={!isHero && itemWidth ? { flex: `0 0 ${itemWidth}px`, paddingRight: '1rem' } : (isHero ? {} : { flex: `0 0 calc(100% / ${itemsToShow})`, paddingRight: itemsToShow > 1 ? '1rem' : '0'})} // Basic responsive for multi-item non-hero
          >
            {renderItem(item, index)}
          </div>
        ))}
      </div>

      {/* Arrows */}
      {showArrows && (
        <>
          <button
            onClick={goToPrevious}
            className={`absolute top-1/2 -translate-y-1/2 left-2 sm:left-4 z-10 p-2 rounded-full 
                        ${isHero ? `bg-black/30 hover:bg-black/50 text-white` : `bg-[${THEME_COLORS.backgroundCream}]/70 hover:bg-[${THEME_COLORS.accentBeige}] text-[${THEME_COLORS.textBrown}] shadow-md`}`}
            aria-label="Previous slide"
          >
            <ChevronLeftIconComponent className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
          <button
            onClick={goToNext}
            className={`absolute top-1/2 -translate-y-1/2 right-2 sm:right-4 z-10 p-2 rounded-full 
                        ${isHero ? `bg-black/30 hover:bg-black/50 text-white` : `bg-[${THEME_COLORS.backgroundCream}]/70 hover:bg-[${THEME_COLORS.accentBeige}] text-[${THEME_COLORS.textBrown}] shadow-md`}`}
            aria-label="Next slide"
          >
            <ChevronRightIconComponent className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
        </>
      )}

      {/* Dots */}
      {showDots && isHero && ( // Dots primarily for hero
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full transition-colors 
                          ${currentIndex === index ? `bg-[${THEME_COLORS.primaryGreen}]` : 'bg-white/50 hover:bg-white/80'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
