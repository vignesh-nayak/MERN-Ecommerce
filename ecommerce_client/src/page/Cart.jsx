import React, { useEffect } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import myCart from '../assets/cart.png';
import { removeItem } from '../redux/actions/actionCart';
import axios from 'axios';
import { logout } from '../redux/actions/actionUser';

const Cart = () => {
  window.scrollTo(0,0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const config = {
    headers: {
      authorization: `Bearer ${userInfo?.token}`
    }
  }
  const { cartItems, loading, error } = cart;
  const sumTotalAmount = cartItems?.map(item => item?.qty * item?.price).reduce((subTotalOne, subTotalTwo) => subTotalOne + subTotalTwo, 0);

  const checkLogin = async () => {
      const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/api`, config);
      if(result?.data?.error?.name === "TokenExpiredError" || error) {
        dispatch(logout());
        navigate('/login');
      }
    }
    useEffect(() => {
        checkLogin();        
    }, [dispatch])
    
  const removeItemFromCart = (e, item) => {
    e.preventDefault();
    dispatch(removeItem(item.id))
  }

  return (
    <div className='main'>
        <Navbar/>
        {
          loading ? 
            <div>Loading...</div> 
            :
            error ? 
            <div className='noProductFound text-center'>
              <div>
                Some went wrong,
              </div>
             <Link className='text-white' to={'/login'}>
               login again 
            </Link>
            </div>
            :
          cartItems?.length !== 0 
          ?
          <div className='cartItems'>
            <h1 className='cartHeading'>Cart items:</h1>
            {
              cartItems?.map((cartItem, i) => (
                <div className='cartItem' key={i}>
                  <img src={myCart} alt="No images Found" className='productImgInCartPage'/>
                  <div className='cartItemDetails'>
                      <div className='noProductFound'>Name: <span className='spanValue'>{cartItem?.name}</span></div>
                      <div className='noProductFound'>Quantity: <span className='spanValue'>{cartItem?.qty}</span></div>
                      <div className='noProductFound'>Price: <span className='spanValue'>{cartItem?.price}</span></div>
                      <div className='noProductFound'>SubTotal: <span className='spanValue'>{cartItem?.qty * cartItem?.price}</span></div>
                  </div>
                  <button className='button cancelItemButton' onClick={(e)=> removeItemFromCart(e, cartItem)}>X</button>
                </div>
              ))  
            }
            <div className='cartTotal'>Total: <span className='spanValue'>{sumTotalAmount}</span></div>
            <Link to="/placeOrder" state={{ total: sumTotalAmount }} className='button placeOrderButton'>Next</Link>
          </div>
          :
          <div className='noProductFound text-center'>
            <h1>No items found in cart.</h1>
          </div>
        }
        <Footer/>
    </div>
  )
}

export default Cart