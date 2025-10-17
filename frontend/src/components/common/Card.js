// components/common/Card.jsx
import React from 'react';

const Card = ({ children, className = '', title, headerAction }) => {
  return (
    <div className={`bg-gray-900 border-2 border-gray-800 rounded-lg shadow-lg p-6 ${className}`}>
      {title && (
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-cyan-400">{title}</h3>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;