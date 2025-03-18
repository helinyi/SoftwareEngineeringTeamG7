import React from 'react';
import './Header.css'; 

const Header = () => {
  return (
    <header className="header">
      <div className="logo">Deal Scout</div>
      <nav className="nav">
        <a href="#">Shop</a>
        <a href="#">On Sale</a>
        <a href="#">New Arrivals</a>
        <a href="#">Brands</a>
      </nav>
      <div className="search-and-icons">
        <i className="fas fa-search"></i>
        <input type="text" placeholder="Search for products..." className="search-bar" />
        <span className="icon"><i class="fa-solid fa-cart-shopping"></i></span>
        <span className="icon"><i class="fa-solid fa-user"></i></span>
      </div>
    </header>
  );
};

export default Header;