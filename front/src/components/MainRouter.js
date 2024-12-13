// src/components/MainRouter.js
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Menu from '../pages/Menu';
import Login from '../pages/Login';
import Reservation from '../pages/Reservation';
import Members from '../pages/Member';


const MainRouter = () => {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/members" element={<Members />} />
      </Routes>
    </div>
  );
};

export default MainRouter;
