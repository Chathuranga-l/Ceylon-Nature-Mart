
import React from 'react';
import { Category } from '../types';
import { THEME_COLORS } from '../constants';

interface CategoryCardProps {
  category: Category;
  onClick: (categoryName: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
  return (
    <div 
      className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer transform transition-all hover:shadow-xl hover:-translate-y-1 duration-300 ease-in-out"
      onClick={() => onClick(category.name)}
    >
      <img src={category.imageUrl} alt={category.name} className="w-full h-40 object-cover" />
      <div className="p-4 text-center">
        <h3 className={`font-serif-display text-lg font-semibold text-[${THEME_COLORS.textBrown}]`}>{category.name}</h3>
      </div>
    </div>
  );
};

export default CategoryCard;
