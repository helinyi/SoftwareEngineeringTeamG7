import React from 'react';
import ProductCard from './ProductCard';

function ProductGrid() {
  // Sample data to illustrate the product cards
  const products = [
    {
      id: 1,
      name: 'Google Pixel 9 Pro',
      price: '899',
      image: 'https://via.placeholder.com/200x300?text=Pixel+9+Pro',
      category: 'phone'
    },
    {
      id: 2,
      name: 'RedMagic 10 Pro 5G',
      price: '799',
      image: 'https://via.placeholder.com/200x300?text=RedMagic+10+Pro+5G',
      category: 'phone'
    },
    {
      id: 3,
      name: 'Apple iPhone 15, 128GB',
      price: '780',
      image: 'https://via.placeholder.com/200x300?text=iPhone+15',
      category: 'phone'
    },
    {
      id: 4,
      name: 'MacBook Pro 16"',
      price: '2499',
      image: 'https://via.placeholder.com/200x300?text=MacBook+Pro+16',
      category: 'laptop'
    },
    {
      id: 5,
      name: 'Dell XPS 15',
      price: '1999',
      image: 'https://via.placeholder.com/200x300?text=Dell+XPS+15',
      category: 'laptop'
    },
    {
      id: 6,
      name: 'Lenovo ThinkPad X1',
      price: '1699',
      image: 'https://via.placeholder.com/200x300?text=ThinkPad+X1',
      category: 'laptop'
    }
  ];

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
