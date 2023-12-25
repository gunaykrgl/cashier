import Cart from "./components/Cart"
import BarcodeForm from './components/BarcodeForm'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import { useState, useEffect } from 'react'
import Cashier from './pages/Cashier';

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Cashier />} />
      </Routes>
    </Router>
  )
}

export default App
