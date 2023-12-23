import './App.css'
import Cart from "./components/Cart"
import BarcodeForm from './components/BarcodeForm'

import Navbar from './components/Navbar'
import { useState, useEffect } from 'react'

interface Product {
  name: string;
  quantity: number;
  price: number;
  barcode: Number;
}

function App() {
  const [cart, setCart] = useState<Product[]>([])

  // Fetch the products list from the server
  const [productsList, setProductsList] = useState<Product[]>([])
  useEffect(() => {
    fetch('http://localhost:9000/getProductsList')
      .then((res) => res.json())
      .then((data) => setProductsList(data))
  }, [])


  function finalizePurchase(cart: any) {
    const productsToSend = cart.map((product: any) => {
      return {
        barcode: product.barcode,
        quantity: product.quantity
      }
    })
    console.log(productsToSend)
    fetch('http://localhost:9000/finalizeCart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productsToSend)
    })

    setCart([])
  }

  const removeItem = (itemId: number) => {
    const updatedCart = cart.filter(product => product.barcode !== itemId)
    setCart(updatedCart)
  }

  return (
    <>
      <Navbar />
      <div className='barcodePage'>

        <BarcodeForm
          productsList={productsList}
          cart={cart}
          setCart={setCart}
        />
        <Cart items={cart}
          removeItem={removeItem}
        />
        <button onClick={() => finalizePurchase(cart)}>Complete</button>
      </div>
    </>
  )
}

export default App
