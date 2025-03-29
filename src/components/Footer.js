import React from 'react';
import { Link } from 'react-router-dom';
import { FiTwitter, FiFacebook, FiInstagram, FiGithub } from 'react-icons/fi';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            Deal Scout
          </Link>
          <p className="footer-description">
            We have clothes that suits your style and which you're proud to wear. From women to men.
          </p>
          <div className="social-links">
            <a href="#" className="social-link">
              <FiTwitter />
            </a>
            <a href="#" className="social-link">
              <FiFacebook />
            </a>
            <a href="#" className="social-link">
              <FiInstagram />
            </a>
            <a href="#" className="social-link">
              <FiGithub />
            </a>
          </div>
        </div>

        <div className="footer-links">
          <div className="footer-section">
            <h3>COMPANY</h3>
            <ul>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/features">Features</Link></li>
              <li><Link to="/works">Works</Link></li>
              <li><Link to="/career">Career</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>HELP</h3>
            <ul>
              <li><Link to="/support">Customer Support</Link></li>
              <li><Link to="/delivery">Delivery Details</Link></li>
              <li><Link to="/terms">Terms & Conditions</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>FAQ</h3>
            <ul>
              <li><Link to="/account">Account</Link></li>
              <li><Link to="/deliveries">Manage Deliveries</Link></li>
              <li><Link to="/orders">Orders</Link></li>
              <li><Link to="/payments">Payments</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>RESOURCES</h3>
            <ul>
              <li><Link to="/ebooks">Free eBooks</Link></li>
              <li><Link to="/tutorial">Development Tutorial</Link></li>
              <li><Link to="/blog">How to - Blog</Link></li>
              <li><Link to="/youtube">Youtube Playlist</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>Deal Scout © 2000-2023 All Rights Reserved</p>
          <div className="payment-methods">
            <img src="/images/visa.png" alt="Visa" />
            <img src="/images/mastercard.png" alt="Mastercard" />
            <img src="/images/paypal.png" alt="PayPal" />
            <img src="/images/apple-pay.png" alt="Apple Pay" />
            <img src="/images/google-pay.png" alt="Google Pay" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
