import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NerdTerminal from './components/NerdTerminal';
import Metrics from './components/Metrics';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NerdTerminal />} />
        <Route path="/metrics" element={<Metrics />} />
      </Routes>
    </Router>
  );
}

export default App;
