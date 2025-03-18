import React from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiUser, FiChevronDown } from 'react-icons/fi';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="logo">
          Deal Scout
        </Link>

        <div className="nav-menu">
          <div className="dropdown">
            <button className="nav-link">
              Shop <FiChevronDown className="dropdown-icon" />
            </button>
          </div>
          <Link to="/on-sale" className="nav-link">On Sale</Link>
          <Link to="/new-arrivals" className="nav-link">New Arrivals</Link>
          <Link to="/brands" className="nav-link">Brands</Link>
        </div>

        <div className="search-bar">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search for products..."
            className="search-input"
          />
        </div>

        <div className="nav-icons">
          <Link to="/cart" className="icon-button">
            <FiShoppingCart />
          </Link>
          <Link to="/account" className="icon-button">
            <FiUser />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
