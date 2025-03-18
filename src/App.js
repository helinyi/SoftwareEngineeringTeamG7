import React from 'react';
import './App.css';
import SignUp from './pages/SignUp.js';
import LoginPage from './pages/Login.js';
import LandingPage from './pages/Landing.js';

function App() {
  return (
    <div className="App">
      <SignUp />
      <LoginPage />
      <LandingPage />
    </div>
  );
}

export default App;