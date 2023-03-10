import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './../routes/Auth';
import Home from './../routes/Home';
import firebase from 'firebase/compat/app';
import Navigation from './Navigation';
import Profile from '../routes/Profile';

const Router = ({ isLoggedIn, userObj }) => {
  return (
    <BrowserRouter>
      {isLoggedIn && <Navigation />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home userObj={userObj} />} />
            <Route path="/profile" element={<Profile />} />
          </>
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
