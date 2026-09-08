import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import './App.css'

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<ProductsPage />} />
        <Route path='/products/:id' element={<ProductDetailPage />} />
        <Route path='/cart' element={<CartPage />} />
      </Routes>
    </div>
  )
}

export default App
