import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Product } from './components/Pages/Product/Product'
import { Footer } from './components/Shared/Footer'
import Header from './components/Shared/Header'
import NavBar from './components/Shared/NavBar'
import PayementField from './components/Shared/PaymentField'
import PaymentModal from './components/Shared/PaymentModal'
import { SignInPrompt } from './components/Shared/SignInPrompt'
import {Login} from '../src/components/Pages/Login/Login'
import {Register} from '../src/components/Pages/Login/Register'
import { Landing } from './components/Pages/Product/Landing'
import {Category} from './components/Pages/Category/Category'
import { SubCategory } from './components/Pages/Category/SubCategory'
import {ViewProductDetail} from './components/Pages/Product/ViewProductDetail';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/" element={<Landing />} />
          <Route path="/categories" element={<Category/>} />
          <Route path="/subCategory" element={<SubCategory/>} />
          <Route path="/product" element={<Product />} />
          <Route path="/viewproductdetails" element={<ViewProductDetail/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
