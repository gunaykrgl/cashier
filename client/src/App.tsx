import './App.css'
import Cart from "./components/Cart"
import Navbar from './components/Navbar'
import React, { useState, useEffect } from 'react'

function App() {
  const [cart, setCart] = useState([])
  const [productsList, setProductsList] = useState([])
  useEffect(() => {
    fetch('http://localhost:9000/getProductsList')
      .then((res) => res.json())
      .then((data) => setProductsList(data))
  }, [])

  function handleSubmit(event: any) {
    event.preventDefault()
    const barcode = Number(event.target.barcode.value)
    //! VALIDATE BARCODE HERE (int, string etc)
    const product = productsList.find((product) => product.barcode == barcode)
    setCart([...cart, product])
    //! CHANGE THE NEXT LINE, IT'S JUST A LAZY WAY OF CLEANING THE FORM
    event.target.barcode.value = ''
  }
  function finalizePurchase(cart: any) {
    console.log(cart)
    fetch('http://localhost:9000/barcode/finalize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cart)
    })

    setCart([])
  }
  return (
    <>
      <Navbar />
      <div className='barcodePage'>
        <div className='barcodeLookup'>
          <p>Enter the barcode below to add a product to cart:</p>
          <form onSubmit={handleSubmit}>
            <input
              type="number"
              name="barcode"
              autoComplete="off"
              placeholder="barcode"

              autoFocus
              required
            />
            <input type="submit" value="Submit" />
          </form>
        </div>
        <Cart items={cart} />
        <button onClick={() => finalizePurchase(cart)}>Complete</button>
      </div>
    </>
  )
}

export default App
