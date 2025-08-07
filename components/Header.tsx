
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center py-8">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight">
        Finance AI & Automation
      </h1>
      <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
        Submit your AI & Automation ideas and vote on what we should build next!
      </p>
    </header>
  );
};

export default Header;