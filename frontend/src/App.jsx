import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home.jsx'
import Order from './pages/Order/Order.jsx'
import About from './pages/About/About.jsx'
import Faq from './pages/FAQ/Faq.jsx'
import Product from './pages/Product/Product.jsx'
import ProductDetail from './pages/Product/ProductDetail.jsx'
import Feedback from './pages/Feedback/Feedback.jsx'
import Login from './pages/Login/Login.jsx'
import Dashboard from './pages/Admin/Dashboard.jsx'
import Inventory from './pages/Admin/Inventory.jsx'
import Analytics from './pages/Admin/Analytics.jsx'
import FeedbackManagement from './pages/Admin/FeedbackManagement.jsx'
import { FavoritesProvider } from './contexts/FavoritesContext.jsx'


function App() {
  return (
    <FavoritesProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<Order />} />
        <Route path="/about" element={<About />} />
        <Route path="/product" element={<Product />} />
        <Route path = "/faq" element ={<Faq />} />
        <Route path = "/feedback" element ={<Feedback />} />
        <Route path="/productDetail/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/inventory" element={<Inventory />} />
        <Route path="/admin/analytics" element={<Analytics />} />
        <Route path = "/admin/feedbackManagement" element ={<FeedbackManagement />} />
      </Routes>
    </FavoritesProvider>
  )
}

export default App
