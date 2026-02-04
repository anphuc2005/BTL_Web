import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home.jsx'
import Order from './pages/Order/Order.jsx'
import About from './pages/About/About.jsx'
import Faq from './pages/FAQ/Faq.jsx'
import Product from './pages/Product/Product.jsx'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/order" element={<Order />} />
      <Route path="/about" element={<About />} />
      <Route path="/product" element={<Product />} />
      <Route path = "/faq" element ={<Faq />} />
    </Routes>
  )
}

export default App
