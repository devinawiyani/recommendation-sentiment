import React from 'react';
import { BrowserRouter as Router, Route, BrowserRouter, Routes } from 'react-router-dom';
import MainPage from './inputPage';
import ResultPage from './resultPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route path="/resultPage" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
