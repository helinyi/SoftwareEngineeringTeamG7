import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/products/${product.id}`}>
        <div className="h-48 relative overflow-hidden">
          {product.image ? (
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No image</span>
            </div>
          )}
          {product.discount > 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
              {product.discount}% OFF
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-gray-700 font-semibold text-sm mb-1 truncate">{product.name}</h3>
          <p className="text-gray-500 text-xs mb-2">{product.brand}</p>
          <div className="flex justify-between items-center">
            <span className="text-primary font-bold">${product.best_price}</span>
            <span className="text-xs text-gray-500">{product.category_name}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;