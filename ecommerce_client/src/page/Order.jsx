import React, { useEffect } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from 'react-redux';
import { getOrdersOfUser } from '../redux/actions/actionOrder';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { logout } from '../redux/actions/actionUser';

const Order = () => {
  window.scrollTo(0,0);
  const dispatch = useDispatch();
  const showOrders = useSelector(state => state.showOrders);
  const { orders,loading, error } = showOrders;
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
    dispatch(getOrdersOfUser())
  }, [dispatch])

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
          orders?.length
          ?
          <div className='orderItems'>
            <h1 className='orderHeading'>Order History.</h1>
            <table>
              <tr>
                <th>Order Id</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Total</th>
                {/* <th>More Info..</th> */}
              </tr>
              {
                orders?.map((order, i) => (
                  <tr key={i} className={order?.isDelivered ? 'bg-green' : 'bg-red'}>
                    <td>{order?._id}</td>
                    <td className={order?.isPaid ? 'bg-green' : 'bg-red'}>{order?.isPaid ? 'Paid' : 'Not Paid'}</td>
                    <td>{order?.isDelivered ? 'Delivered' : 'Not Delivered'}</td>
                    <td>{order?.totalPrice}</td>
                    {/* <td>
                      <button onClick={() => setShowMoreInfo(setShowMoreInfo => !setShowMoreInfo)}>
                        <img src={downArrow} alt="" srcset="" height='10vh' width='10vw'/>
                      </button>
                    </td> */}
                    
                  </tr>
                ))  
              }
            </table>
          </div>
          :
          <div className='orderInfo text-center'>
            <h1>No Past orders found.</h1>
          </div>
        }
        <Footer/>
    </div>
  )
}

export default Order 