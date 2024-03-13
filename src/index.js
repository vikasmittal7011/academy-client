// import React from 'react'
import App from './App'
import ReactDOM from 'react-dom/client'

import "./index.css";
import { Provider } from 'react-redux';
import { store } from './app/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
