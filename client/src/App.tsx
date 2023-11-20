import './App.css'
import Cart from "./components/Cart"
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
  const [productsList, setProductsList] = useState<Product[]>([])
  useEffect(() => {
    fetch('http://localhost:9000/getProductsList')
      .then((res) => res.json())
      .then((data) => setProductsList(data))
  }, [])

  function handleSubmit(event: any) {
    event.preventDefault()
    const barcode:Number = Number(event.target.barcode.value)
    //! VALIDATE BARCODE HERE (int, string etc)
    const product = productsList.find((product) => product.barcode == barcode)
    // Check if the product is in the cart
    const isProductInCart = cart.find(product => product.barcode === barcode);

    if (isProductInCart) {
      const updatedCart = cart.map(product => {
        if (product.barcode === barcode) {
          return {
            ...product,
            quantity: product.quantity + 1
          }
        }
        return product
      })
      setCart(updatedCart)
    }
    else {
      setCart([...cart, { ...product, quantity: 1 } as Product])
    }

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
