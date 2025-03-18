import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css'; // IMPORTANT: make sure this file exists in src/
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Sidebar from './components/Sidebar';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <div className="container">
            <Routes>
              <Route path="/" element={
                <div className="shop-layout">
                  <Sidebar />
                  <div className="shop-content">
                    <ProductList />
                  </div>
                </div>
              } />
              <Route path="/product/:productId" element={<ProductDetail />} />
            </Routes>
          </div>
        </main>
        <Newsletter />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
