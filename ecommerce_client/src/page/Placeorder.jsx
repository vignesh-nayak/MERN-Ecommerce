import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../redux/actions/actionCart';
import { createOrder } from '../redux/actions/actionOrder';
import axios from 'axios';
import { logout } from '../redux/actions/actionUser';

const Placeorder = () => {
  window.scrollTo(0,0);
  const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const { cartItems, error } = cart;
    const [paymentMethod, setPaymentMethod] = useState('');
    const [shippingAddress, setShippingAddress] = useState('');
    const location = useLocation();
    const { total } = location.state
    const tax = total * 0.1, shippingPrice = total > 1000 ? 0 : 300;
    const navigate = useNavigate();
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    const config = {
        headers: {
        authorization: `Bearer ${userInfo?.token}`
        }
    }
    
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

    const placeOrder = async (e) =>{
        // has to updated inventory.
        if(paymentMethod === '' || shippingAddress === '') return;
        e.preventDefault();
        const orderInfo = {
            user:userInfo?.id,
            orderedItems: cartItems,
            otherInfo: {
                shippingAddress,
                paymentMethod,
                paymentResult: true,
                taxPrice: tax,
                shippingPrice,
                totalPrice: total + tax + shippingPrice,
                isPaid: true,
                paidAt: new Date().toLocaleString(),
            }
        }
        await checkLogin(); 
        const isLoginned = JSON.parse(localStorage.getItem('userInfo'));
        if(isLoginned) {
            await dispatch(createOrder(orderInfo)) ;        
            await dispatch(clearCart());
            alert('order placed');
            navigate('/');
        }
    }

    
  return (
    <div className='main'>
        <Navbar/>
        <div className='placeOrder'>
            <div className='shippingAddress'>
                <h1 className='placeOrderHeading'>Shipping Address</h1>
                <textarea placeholder='Write your shipping address...' className='reviewInput' value={shippingAddress} onChange={(e) => setShippingAddress(e.target.value)}/>
            </div>
            <div className='paymentMethod'>
                <h1 className='placeOrderHeading'>Payment Method</h1>
                <div className='paymentMethodOption'>
                    <label className='paymentMethodO' onClick={() => setPaymentMethod('creditCard')}>
                        <input type="radio" id="creditCard" name="paymentType"/> Credit Card
                    </label>
                    <label className='paymentMethodO' onClick={() => setPaymentMethod('debitCard')}>
                        <input type="radio" id="debitCard" name="paymentType" /> Debit Card
                    </label>
                    <label className='paymentMethodO' onClick={() => setPaymentMethod('upi')}>
                        <input type="radio" id="upi" name="paymentType"/> UPI
                    </label>
                    <label className='paymentMethodO' onClick={() => setPaymentMethod('cash')}>
                        <input type="radio" id="cash" name="paymentType"/> CASH
                    </label>
                </div>
                <div className='noProductFound paymentMethodPrice'>
                    {
                    paymentMethod ?
                        <div className='text-center'>
                            <div>Item Price: {total}</div>
                            <div>Tax: {tax}</div>
                            <div>Shipping Price: {shippingPrice}</div>
                            Will be paying <span className='text-white'>Rs.{total + tax + shippingPrice}</span> in {paymentMethod}
                        </div>
                    :
                    <div>
                        Select payment method.
                    </div>
                    }
                </div>
                <button className='button placeOrderButton' hidden={(paymentMethod === '' || shippingAddress === '')} onClick={(e) => placeOrder(e)}>Place Order</button>

            </div>
        </div>
        <Footer/>
    </div> 
  )
}

export default Placeorder