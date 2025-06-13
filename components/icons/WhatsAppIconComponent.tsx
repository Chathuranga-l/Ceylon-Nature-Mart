
import React from 'react';

interface WhatsAppIconComponentProps {
  className?: string;
}

const WhatsAppIconComponent: React.FC<WhatsAppIconComponentProps> = ({ className }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className || "w-6 h-6"}
    >
      <path d="M16.6 14.2c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-.7-.3-1.4-.7-2-1.2-.5-.5-1-1.1-1.4-1.7-.1-.2 0-.4.1-.5.1-.1.2-.2.4-.4.1-.1.2-.2.2-.3.1-.1.1-.3 0-.4-.1-.1-.6-1.3-.8-1.8-.1-.7-.3-.6-.5-.6h-.5c-.2 0-.5.2-.6.7-.2.5-.7 1.6-.7 3.2 0 1.6.8 3.1 1 3.3.2.2 1.5.7 3.5 1.6.5.2 1 .4 1.3.5.5.1.9.1 1.2.1.4-.1.9-.6 1.3-1.1.2-.6.2-1.1.1-1.2l-.4-.2zM12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z"/>
    </svg>
  );
};

export default WhatsAppIconComponent;
