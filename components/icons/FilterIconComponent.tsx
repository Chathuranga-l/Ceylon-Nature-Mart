import React from 'react';

interface FilterIconComponentProps {
  className?: string;
}

const FilterIconComponent: React.FC<FilterIconComponentProps> = ({ className }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={1.5} 
      stroke="currentColor" 
      className={className || "w-5 h-5"}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-1.1 0-2 .9-2 2v1.41c0 .53-.21 1.04-.59 1.41L4.6 13.04c-.75.75-.22 2.01.8 2.01h13.19c1.02 0 1.55-1.26.8-2.01L14.58 7.83A2.003 2.003 0 0 0 14 6.42V5c0-1.1-.9-2-2-2zm0 2V3m0 4.41L14.59 8M9.41 8L7 10.41m0 0L4.6 13.04m2.4-2.63L12 15h0m-2.59-4.59L12 8l2.59 2.41m0 0L17.4 13.04m-2.4-2.63L12 15" />
       <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M6 10.5h12M9 14.25h6" />
    </svg>
  );
};

export default FilterIconComponent;
