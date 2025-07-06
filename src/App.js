import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Metrics from './components/Metrics';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/metrics" element={<Metrics />} />
      </Routes>
    </Router>
  );
}

export default App;
