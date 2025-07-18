import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white p-4 rounded shadow mb-4">
      <h1 className="text-2xl font-bold">Creepy Manager</h1>
      <p className="text-sm">Your AI-powered interview assistant</p>
    </header>
  );
}

export default Header;