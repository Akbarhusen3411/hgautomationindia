/**
 * Application Entry Point
 * Initializes React application with Tailwind CSS
 */

import React from 'react';
import ReactDOM from 'react-dom/client';

// Tailwind CSS
import './index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
