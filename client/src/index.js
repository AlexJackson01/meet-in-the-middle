import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import Favourites from '../src/components/Favourites';
import About from '../src/components/About';
import Contact from '../src/components/Contact';
import Login from '../src/components/Login';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="home" element={<App />} />
      <Route path="favourites" element={<Favourites user={true}/>} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
