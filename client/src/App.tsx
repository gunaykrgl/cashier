import './App.css'
import Cart from "./components/Cart"
import BarcodeForm from './components/BarcodeForm'
import Navbar from './components/Navbar'
function App() {
  return (
    <>
    <Navbar />
      <div className='barcodePage'>
        <BarcodeForm />
        <Cart items= {[{name: "demo", quantity:"2", price:"5"}]}/>
        
        
      </div>
    </>
  )
}

export default App
