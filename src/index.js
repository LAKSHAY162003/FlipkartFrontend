import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { BrowserRouter,Routes,Route } from 'react-router-dom';
import RegisterBusiness from './pages/RegisterBusiness';
import RegisterCustomer from './pages/RegisterCustomer';
import LoginCustomer from './pages/loginCustomer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <BrowserRouter>
        <Routes>
          <Route path="/joinBusiness" element={<RegisterBusiness />} />
          <Route path="/joinCustomer" element={<RegisterCustomer />} />
          <Route path="/loginCustomer" element={<LoginCustomer />} />
          <Route path="/" element={<App/>} />
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
);

