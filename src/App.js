// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Component/Header/Header';
import TourCard from './Pages/TourCard';
import Home from './Component/Home/Home';
import Footer from './Component/Footer/Footer';
import TourPackageListing from './Component/TourPackageListing/TourPackageListing';
import Register from './Pages/Register';
import Login from './Pages/Login';
import ExploreMore from "./Component/ExploreMore/ExploreMore";
import Dashboard from './Component/Dashboard/Dashboard';


const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tour-packages" element={<TourPackageListing />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/explore-more/:id" element={<ExploreMore />} />
        <Route path="/Dashboard" element={<Dashboard/>} />

      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
