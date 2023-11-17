import './App.css'
import Cart from "./components/Cart"
import BarcodeForm from './components/BarcodeForm'
import Navbar from './components/Navbar'
import React, {useState, useEffect} from 'react'

function App() {
  const [cart, setCart] = useState([])
  async function getCart() {
    const response = await fetch("http://localhost:9000/barcode/cart")
    const data = await response.json()
    setCart(data)  
  }
  useEffect(() => {
    getCart()
  }, [])
  return (
    <>
    <Navbar />
      <div className='barcodePage'>
        <BarcodeForm />
        <Cart items= {cart}/>
        
        
      </div>
    </>
  )
}

export default App
