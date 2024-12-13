//import {useEffect, useState} from 'react';

//for JSX syntax transformed into React function calls, React 17+ no need this
import React from 'react';
import { useState, useEffect } from 'react';
import NavbarRouter from './components/NavbarRouter';
import MainRouter from './components/MainRouter';
import Footer from './components/Footer';

import './App.css';


function App() {



  return (
    <div className="App">
      <NavbarRouter />
      <main>

        <MainRouter />
      </main>
      <Footer />
    </div>
  );
}

export default App;
