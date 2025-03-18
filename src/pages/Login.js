import React from 'react';
import './Login.css'; 
import Layout from '../components/Layout.js';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';

const LoginPage = () => {
  return (
    <Layout>
    <div className="login-container">
      <div className="login-form-section">
        <h1>Login</h1>

        <div className="input-group">
          {/* <label>Email</label> */}
          <input type="email" placeholder="Enter your email" />
        </div>

        <div className="input-group">
          {/* <label>Password</label> */}
          <input type="password" placeholder="Enter your password" />
        </div>

        <div className="options">
          <div>
            <input type="checkbox" id="remember" />
            <label htmlFor="remember"> Remember Me</label>
          </div>
          <a href="/" className="forgot-password">Forget Password</a>
        </div>

        <div className="social-login">
          <button className="social-btn"><FaGoogle size={24} /></button>
          <button className="social-btn"><FaFacebook size={24} /></button>
          <button className="social-btn"><FaApple size={24} /></button>
        </div>

        <button className="login-btn">Login</button>

        <p className="signup-link">Don't Have Account? <a href="/">Sign Up</a></p>
      </div>

      <div className="login-image-section">
        <img src="../assets/iphone.jpg" alt="Phone" /> 
      </div>
    </div>
    </Layout>
  );
};

export default LoginPage;