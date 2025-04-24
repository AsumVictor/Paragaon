import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="bg-emerald-900 w-12 h-12 rounded-lg flex items-center justify-center">
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4L4 8L12 12L20 8L12 4Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 16L12 20L20 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 12L12 16L20 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
};

export default Logo;