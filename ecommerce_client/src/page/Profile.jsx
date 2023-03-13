import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { logout } from '../redux/actions/actionUser';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const userLogin = useSelector(state => state.userLogin);
  const { error } = userLogin;
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const config = {
    headers: {
      authorization: `Bearer ${userInfo?.token}`
    }
  }

    const [email, setEmail] = useState(userInfo?.email);
    const [editEmail, setEditEmail] = useState(true);
    const [editName, setEditName] = useState(true);
    const [name, setName] = useState(userInfo?.name);
    const [newPassword, setNewPassword] = useState('');
    const dispatch = useDispatch();

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


    const editInfo = (e) => {
        e.preventDefault();
        if(e.target.innerText.includes('Email')) setEditEmail(editEmail => !editEmail);
        if(e.target.innerText.includes('Name')) setEditName(editName => !editName);
        if(e.target.innerText.includes('Password')) { }
    }
  return (
    <div className='main'>
      <Navbar/>
       <div className='divContainer'>
            <div className='divHeader'>
                <h1>Basic Profile</h1>
            </div>
            <label className='formLabel'>
                Email:
                <input name='EmailId' className='formInput' type="Email" onChange={(e) => setEmail(e.target.value)} value={email} required disabled={editEmail}/>
            </label>
            <button className='formButton' disabled={true} onClick={(e) => editInfo(e)}>{!editEmail ? "Save" : "Edit" } Email</button>
            <label className='formLabel'>
                Name:
                <input name='Name' className='formInput' type="text" onChange={(e) => setName(e.target.value)} value={name} required disabled={editName}/>
            </label>
            <button className='formButton' disabled={true} onClick={(e) => editInfo(e)}>{!editName ? "Save" : "Edit" } Name</button>
            <label className='formLabel'>
                New Password:
                <input name='password' className='formInput' type="password" onChange={(e) => setNewPassword(e.target.value)} value={newPassword} disabled={editEmail}/>
            </label>
            <button className='formButton' disabled={true} onClick={(e) => editInfo(e)}>Update Password</button>
        </div >
      <Footer/>
    </div>
  )
}

export default Profile