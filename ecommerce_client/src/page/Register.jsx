import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { Link  } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/actions/actionUser';
import { ToastContainer, toast } from 'react-toastify';

const Register = () => {
    const dispatch = useDispatch();
    const userRegister = useSelector((state) => state.userRegister);
    const { user, error } = userRegister;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const notifySuccess = () => toast.success(`User ${user.name} created.`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    const notifyError = () => toast.error(`User ${email} exist.`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        const userObj = { userName: name, userEmail: email, userPassword: password };
        dispatch(register(userObj));
    }

    useEffect(() => {
        if(user){
            setName('');
            setEmail('');
            setPassword('');
            notifySuccess();
        }
        if(error?.statusCode === 400) {
            notifyError();
            setPassword('');

        }
    }, [user, error])
    
  return (
    <div className='main'>
      <Navbar/>
        <div className='divContainer'>
            <div className='divHeader'>
                <h1 >Register Form</h1>
            </div>
            <form className='divForm' onSubmit={onSubmit}>
                <label className='formLabel'>
                    Email:
                    <input name='EmailId' className='formInput' type="Email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                </label>
                <label className='formLabel'>
                    Name:
                    <input name='Name' className='formInput' type="text" onChange={(e) => setName(e.target.value)} value={name} required />
                </label>
                <label className='formLabel'>
                    Password:
                    <input name='password' className='formInput' type="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
                </label>
                <input type="submit" value="Submit" className='formButton' />
            </form>
            <label className='formLabel'>
                <Link to="/login" className='link'>Already have account?</Link>
            </label>
        </div>
      <Footer/>
      <ToastContainer />
    </div>
  )
}

export default Register