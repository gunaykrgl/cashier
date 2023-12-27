import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'

import Cashier from './pages/Cashier';
import Login from './pages/Login';
import AddProduct from './pages/addProduct';

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Cashier />} />
        <Route path='/login' element={<Login />} />
        
        {/* //! CHANGE this so that add product and update product is in the same page  */}
        <Route path='/addProduct' element={<AddProduct />} />
      </Routes>
    </Router>
  )
}

export default App
