import React from 'react';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import RegisterPage from './layouts/RegisterPage';
import FooterStyledComponent from './components/ui/Footer';
import HeaderStyledComponent from './components/ui/Header';

function App() {
  return (
    <>
      <HeaderStyledComponent />
      <Routes>
        <Route path="/" element={<RegisterPage />} />
      </Routes>
      <FooterStyledComponent />
    </>
  );
}

export default App;
