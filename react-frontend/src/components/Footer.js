import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-10">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-lg font-semibold mb-4">DealScout</h2>
            <p className="text-gray-300 text-sm">
              Finding the best deals across the web so you don't have to.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-white text-sm">
                  All Products
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-4">Contact</h2>
            <p className="text-gray-300 text-sm">
              Have questions or feedback? Reach out to us at support@dealscout.com
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} DealScout. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;