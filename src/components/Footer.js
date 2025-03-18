import React from 'react';
import './Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="logo-section">
          <h2>Deal Scout</h2>
          <p>We have clothes that suits your style and which you're proud to wear. From women to men.</p>
          <div className="social-icons">
            <a href="#" target="_blank"><i className="fab fa-twitter"></i></a>
            <a href="#" target="_blank"><i className="fab fa-facebook"></i></a>
            <a href="#" target="_blank"><i className="fab fa-instagram"></i></a>
            <a href="#" target="_blank"><i className="fab fa-github"></i></a>
          </div>
        </div>

        <div className="footer-links">
          <div>
            <h4>Company</h4>
            <a href="#">About</a>
            <a href="#">Features</a>
            <a href="#">Works</a>
            <a href="#">Career</a>
          </div>
          <div>
            <h4>Help</h4>
            <a href="#">Customer Support</a>
            <a href="#">Delivery Details</a>
            <a href="#">Terms & Conditions</a>
            <a href="#">Privacy Policy</a>
          </div>
          <div>
            <h4>FAQ</h4>
            <a href="#">Account</a>
            <a href="#">Manage Deliveries</a>
            <a href="#">Orders</a>
            <a href="#">Payments</a>
          </div>
          <div>
            <h4>Resources</h4>
            <a href="#">Free eBooks</a>
            <a href="#">Development Tutorial</a>
            <a href="#">How to - Blog</a>
            <a href="#">YouTube Playlist</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>Deal Scout © 2000-2025 All Rights Reserved</p>
        <div className="payment-icons">
          <span><i class="fa-brands fa-cc-visa"></i></span>
          <span><i class="fa-brands fa-cc-mastercard"></i></span>
          <span><i class="fa-brands fa-cc-paypal"></i></span>
          <span><i class="fa-brands fa-cc-apple-pay"></i></span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;