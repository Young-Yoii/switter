import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './../routes/Auth';
import Home from './../routes/Home';

const Router = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <BrowserRouter>
      <Routes>{isLoggedIn ? <Route path="/" element={<Home />} /> : <Route path="/auth" element={<Auth />} />}</Routes>
    </BrowserRouter>
  );
};

export default Router;
