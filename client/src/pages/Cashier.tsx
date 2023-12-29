import './Cashier.css'
import Cart from "../components/Cart"
import BarcodeForm from '../components/BarcodeForm'

import { useState, useEffect } from 'react'

function Cashier() {
  const [cart, setCart] = useState<Product[]>([])
  
  //! REFACTOR: This is a hack to force the productsList to refresh
  const [shouldRefresh, setShouldRefresh] = useState<boolean>(false)
  
  // Fetch the products list from the server
  const [productsList, setProductsList] = useState<Product[]>([])
  useEffect(() => {
    fetch('http://localhost:9000/getProductsList')
      .then((res) => res.json())
      .then((data) => setProductsList(data))
  }, [shouldRefresh])


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
    setShouldRefresh(!shouldRefresh)
    setCart([])
  }

  const removeItem = (itemId: number) => {
    const updatedCart = cart.filter(product => product.barcode !== itemId)
    setCart(updatedCart)
  }

  return (
    <>

        <BarcodeForm
          productsList={productsList}
          cart={cart}
          setCart={setCart}
        />
        <Cart items={cart}
          removeItem={removeItem}
        />
        <button onClick={() => finalizePurchase(cart)}>Complete</button>
    </>
  )
}

export default Cashier
