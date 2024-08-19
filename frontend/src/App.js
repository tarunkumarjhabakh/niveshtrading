import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Home from "./Pages/Home"; 
import MarketAnalysis from "./Pages/MarketAnalysis";
import ResearchReport from "./Pages/ResearchReport";
import RateFinder from "./Pages/RateFinder";
import Login from "./Pages/Login";
import { links } from "./constants";

const App = () => {
  return (
    <div className="container">
      <NavBar links={links} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/market-analysis" element={<MarketAnalysis />} />
        <Route path="/research-report" element={<ResearchReport />} />
        <Route path="/ratefinder" element={<RateFinder />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;