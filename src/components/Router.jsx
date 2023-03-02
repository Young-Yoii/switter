import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './../routes/Auth';
import Home from './../routes/Home';
import firebase from 'firebase/compat/app';

const Router = ({ isLoggedIn }) => {
  return (
    <BrowserRouter>
      <Routes>{isLoggedIn === null ? <Route path="/" element={<Auth />} /> : <Route path="/" element={<Home />} />}</Routes>
    </BrowserRouter>
  );
};

export default Router;
