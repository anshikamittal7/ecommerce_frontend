import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { HelmetProvider } from 'react-helmet-async';

import { Provider } from 'react-redux';
import store from './redux/store';

import "./styles/app.scss";
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider >
        <App />
        <Toaster /> 
      </HelmetProvider>
    </Provider>
  </React.StrictMode>
);
