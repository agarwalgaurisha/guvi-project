// App.jsx
import React from 'react';
import UploadForm from './UploadForm';
import SampleOutput from './SampleOutput';
import './index.css';

function Header() {
  return (
    <header className="app-header">
      <div className="header-left">
        <h1>Resume Checker</h1>
      </div>
      <nav className="header-right">
        <a href="#login">Login</a>
        <a href="#features">Features</a>
        <a href="#pricing">Pricing</a>
        <a href="#howitworks">How it Works</a>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="app-footer">
      <p>Contact us:</p>
      <div className="footer-links">
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">WhatsApp</a>
        <a href="tel:+1234567890">Phone</a>
        <a href="https://t.me/yourchannel" target="_blank" rel="noopener noreferrer">Telegram</a>
      </div>
      <p>© 2025 Your Name. All rights reserved.</p>
    </footer>
  );
}

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-section">
        <UploadForm />
        <SampleOutput />
      </main>
      <Footer />
    </div>
  );
}

export default App;
