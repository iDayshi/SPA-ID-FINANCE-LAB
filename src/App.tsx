import React from 'react';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import RegisterPage from './layouts/RegisterPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
