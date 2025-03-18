import React from 'react';
import './Landing.css'; 
import Layout from '../components/Layout.js';


const LandingPage = () => {
  return (
    <Layout>
    <div className="landing-page">

      <section className="hero-section">
        <div className="hero-content">
          <h1>Your Ultimate Hub for Online Savings</h1>
          <p>Explore unbeatable deals, discover top stores, and enjoy exclusive discounts — all in one seamless shopping experience!</p>
          <button className="shop-now-btn">Shop Now</button>
          <div className="stats">
            <div><h3>200+</h3><p>International Brands</p></div>
            <div><h3>2,000+</h3><p>High-Quality Products</p></div>
            <div><h3>30,000+</h3><p>Happy Customers</p></div>
          </div>
        </div>
        <div className="hero-image">
          <img src="../assets/iphone.jpg" alt="Promotional iPhone" />
        </div>
      </section>

      
      <div className="signup-banner">
        <p>Sign up and get 20% off to your first order. <a href="#">Sign Up Now</a></p>
      </div>

      
      <section className="new-arrivals">
        <h2>New Arrivals</h2>
        <div className="product-grid">
          {["Google Pixel 9 Pro XL", "Red Magic 10 Pro 5G", "Apple iPhone 15, 128GB", "Apple iPhone 15 Pro Max"].map((product, idx) => (
            <div className="product-card" key={idx}>
              <img src="../assets/iphone.jpg" alt={product} />
              <h3>{product}</h3>
              <p><i class="fa-solid fa-star"></i> 4.5/5</p>
              <p>From <strong>$999</strong></p>
              <p>5 Stores</p>
            </div>
          ))}
        </div>
        <button className="view-all-btn">View All</button>
      </section>

      
      <section className="top-selling">
        <h2>Top Selling</h2>
        <div className="product-grid">
          {["Google Pixel 9 Pro XL", "Red Magic 10 Pro 5G", "Apple iPhone 15, 128GB", "Apple iPhone 15 Pro Max"].map((product, idx) => (
            <div className="product-card" key={idx}>
              <img src="../assets/iphone.jpg" alt={product} />
              <h3>{product}</h3>
              <p><i class="fa-solid fa-star"></i> 4.5/5</p>
              <p>From <strong>$999</strong></p>
              <p>5 Stores</p>
            </div>
          ))}
        </div>
        <button className="view-all-btn">View All</button>
      </section>

      <section className="top-brands">
        <h2>Browse by Top Brands</h2>
        <div className="brands-grid">
          {["Apple", "Samsung", "Google", "Motorola"].map((brand, idx) => (
            <div className="brand-card" key={idx}>
              <img src="../assets/iphone.jpg" alt={brand} />
              <h3>{brand}</h3>
            </div>
          ))}
        </div>
        <button className="view-all-btn">View All</button>
      </section>

      <section className="happy-customers">
        <h2>Our Happy Customers</h2>
        <div className="testimonials-grid">
          {[
            { name: "Sarah M.", text: "Deal Scout has completely changed the way I shop online..." },
            { name: "Alex K.", text: "As someone who's always on the lookout for gadgets, Deal Scout is my go-to platform..." },
            { name: "James L.", text: "I love how easy Deal Scout makes it to find discounts..." }
          ].map((testimonial, idx) => (
            <div className="testimonial-card" key={idx}>
              <p><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></p>
              <h4>{testimonial.name}</h4>
              <p>{testimonial.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
    </Layout>
  );
};

export default LandingPage;