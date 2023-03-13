import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { login } from '../redux/actions/actionUser';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const checkLogin = async (e) => {
        e.preventDefault();
        await dispatch(login(email, password));
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        setEmail('');
        setPassword('');
        if(userInfo) navigate('/profile');
        else alert('Invalid credentials');
    }

    
  return (
    <div className='main'>
      <Navbar/>
      <div className='divContainer'>
            <div className='divHeader'>
                <h1 >Login Form</h1>
            </div>
            <form className='divForm' onSubmit={(e) => checkLogin(e)}>
                <label className='formLabel'>
                    Email:
                    <input name='EmailId' className='formInput' type="Email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder='admin@gmail.com' required />
                </label>
                <label className='formLabel'>
                    Password:
                    <input name='password' className='formInput' type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder='aadmin' required />
                </label>
                <input type="submit" value="Submit" className='formButton' />
            </form>
            <label className='formLabel'>
                <Link to="/forgot-password" className='link'>Forgot Password?</Link>
            </label>
            <label className='formLabel'>
                <Link to="/register" className='link'>Create a new account.</Link>
            </label>
        </div >
      <Footer/>
    </div>
  )
}

export default Login