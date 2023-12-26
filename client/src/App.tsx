import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'

import Cashier from './pages/Cashier';
import Login from './pages/Login';


function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Cashier />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
