import React, { useState } from 'react';
import './SignUp.css';
import Layout from '../components/Layout.js';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Handle form submission logic
  };

  return (
    <Layout>
    <div className="signup-container">
      <div className="signup-form">
        <h2>Sign up</h2>
        <p>Let's get you all set up so you can access your personal account.</p>
        <form onSubmit={handleSubmit}>
          <div className="input-row">
            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
          </div>
          <div className="input-row">
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
          </div>
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <div className="checkbox-container">
            <input type="checkbox" name="agree" checked={formData.agree} onChange={handleChange} />
            <label>I Agree to all the <a href="#">Terms and Policies</a></label>
          </div>
          <button type="submit" className="signup-button">Sign up</button>
        </form>
      </div>
      <div className="signup-image">
        <img src="../assets/iphone.jpg" alt="Phone Display" />
      </div>
    </div>
  </Layout>
    
  );
};

export default SignUp;