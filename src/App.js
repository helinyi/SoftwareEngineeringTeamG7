import React from 'react';
import Footer from './components/Footer';
import './index.css';
import PriceAlert from './components/PriceAlert';

function App() {
  return (
    <div className="app">
      {/* Navbar */}
      <div className="navbar">
        <a href="#" className="logo">Deal Scout</a>
        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">Categories</a>
          <a href="#">Deals</a>
          <a href="#">New Arrivals</a>
          <a href="#">Support</a>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="🔍 Search products..." />
        </div>
        <div className="nav-links">
        <a href="#" class="cart-icon">🛒</a>

        
        </div>
      </div>

      <PriceAlert />
      <Footer />
    </div>
  );
}

export default App;
 
