import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './page/pageStyle.css';
import 'react-toastify/dist/ReactToastify.css';
import Products from './page/Products';
import Product from './page/Product';
import NotFound from './page/NotFound';
import Login from './page/Login';
import Register from './page/Register';
import ForgotPassword from './page/ForgotPassword';
import Profile from './page/Profile';
import Cart from './page/Cart';
import Placeorder from './page/Placeorder';
import Order from './page/Order';
import Logout from './page/Logout';
import PrivateRoute from './components/PrivateRoute';

function App() {
  
  return (
    <Routes>
      <Route path="/" exact element={<Products />} />
      <Route path="/search/:string" exact element={<Product />} />
      <Route path="/product/:id" exact element={<Product />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/register" exact element={<Register />} />
      <Route path="/forgot-password" exact element={<ForgotPassword />} />
      <Route path="/logout" exact element={<Logout />} />
      <Route path="/profile" exact element={
        <PrivateRoute>
          <Profile />
        </PrivateRoute>
      }/>
      <Route path="/cart" exact element={
        <PrivateRoute>
          <Cart />
        </PrivateRoute>
      } />
      <Route path="/placeOrder" exact element={
        <PrivateRoute>
          <Placeorder />
        </PrivateRoute>
      } />
      <Route path="/orders" exact element={
        <PrivateRoute>
          <Order />
        </PrivateRoute>
      } />
      <Route path="*" element={<NotFound />} />
      
    </Routes>
  );
}

export default App;
