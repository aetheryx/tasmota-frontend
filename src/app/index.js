import './auth.js';

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import App from './App.jsx';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app')
);

document.addEventListener('drop', e => {
  e.preventDefault();
  e.stopPropagation();
  return false;
});

document.addEventListener('dragover', e => {
  e.preventDefault();
  e.stopPropagation();
});

