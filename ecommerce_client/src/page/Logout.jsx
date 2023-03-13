import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/actions/actionCart';
import { logout } from '../redux/actions/actionUser';

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect( () => {      
    const clearCache = async () => {
      await dispatch(logout());
    }  
    clearCache();
    navigate('/');
  }, [])
  
  return (<div></div>)
}

export default Logout