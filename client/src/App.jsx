import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout/AppLayout';
import HomePage from './pages/HomePage';
import Hero from './components/Hero/Hero';
import Login from './components/Login/Login';
import Register from './components/Login/Register';
import AuthProvider from './components/authprovider/AuthProvider';
import ErrorPages from './components/ErroPage/ErrorPages';
import ProductPage from './PRODUCT/ProductPages';
import Cart from './components/Cart/Cart';
import Contect from './components/contect/contect';
import About from './pages/About';
import { useEffect, useState } from 'react';
import api from './api'; 
// import Checkout from "./components/Checkout/Checkout";
import Checkout from "./components/Checkout/Checkout";
import Success from "./pages/Success";
// import Success from "./Success";


function App() {
  const [numCartItems, setNumberCartItems] = useState(0);
  const cart_code = localStorage.getItem("cart_code");

useEffect(() => {
  if (cart_code) {
    api.get(`get_cart_stat/?cart_code=${cart_code}`)
      .then(res => {
        console.log(res.data);
        setNumberCartItems(res.data.num_of_items);
      })
      .catch(err => {
        console.log(err.message);
      });
  }
}, [cart_code]);


  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<AppLayout numCartItems={numCartItems} />}>
          <Route index element={<HomePage />} />
          <Route path='profile' element={<Hero />} />
          <Route path='contect' element={<Contect />} />
          <Route path='about' element={<About />} />
          <Route path='product/:slug' element={<ProductPage setNumberCartItems={setNumberCartItems} />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='cart' element={<Cart />} />
          <Route path="/order" element={<Checkout />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
          <Route path='*' element={<ErrorPages />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
