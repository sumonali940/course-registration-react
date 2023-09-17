import { useState } from 'react'
import './App.css'
import Home from './Components/Home/Home'
import Cart from './Components/Cart/Cart'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div  className='font-bold text-3xl text-center mb-4'>
      <h2>Course Registration</h2>
    </div>
    <div >
      <Home></Home>
    </div>
      <Cart></Cart>
      
    </>
  )
}

export default App
