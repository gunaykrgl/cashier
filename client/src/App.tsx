import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MainLayout from './components/Layout/MainLayout';
import Cashier from './pages/Cashier';
import Login from './pages/Login';
import ManageProducts from './pages/ManageProducts';
// import AddProduct from './components/addProduct';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainLayout />} >
          
          <Route index element={<Cashier />} />
          <Route path='/login' element={<Login />} />
          
          {/* //! CHANGE this so that add product and update product is in the same page  */}
          {/* <Route path='/addProduct' element={<AddProduct />} /> */}
          <Route path='/manageProducts' element={<ManageProducts />} />
        </Route>
        
      </Routes>
    </Router>
  )
}

export default App
