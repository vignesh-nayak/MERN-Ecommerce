import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
// import { useNavigate, Link } from "react-router-dom";

// use email id, senr temp password.
const ForgotPassword = () => {
    // const url = `${process.env.REACT_APP_BASE_URL}/api/forgotPassword`;
    // const navigate = useNavigate();

    const [email, setEmail] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        // if (password !== confirmPassword) {
        //     setPassword('');
        //     setConfirmPassword('');
        //     alert('password and confrim password does not match.');
        //     return;
        // }
        // if (email === 'admin@gmail.com') {
        //     alert(`can't change password for ${email}`);
        //     return;
        // }

        // const post = { email: email, password: password };
        // try {
        //     const res = await axios.post(url, post)
        //     if (res.data.status === 'ok') {
        //         setEmail('');
        //         setPassword('');
        //         setConfirmPassword('');
        //         alert('password changed successfully.');
        //         navigate('/Login');
        //     }
        //     else {
        //         alert('Password was not able update properly.');
        //     }
        // } catch (e) {
        //     console.log(e);
        // }
        // console.log('forgot password is working')
    }

    return ( <div className='main'>
      <Navbar/>
        <div className='divContainer'>
            <h1 className='divHeader'>Forgot Password Form.</h1>
            <form className='divForm' onSubmit={onSubmit}>
                <label className='formLabel'>
                    Email:
                    <input name='EmailId' className='formInput' type="Email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                </label>
                <input type="submit" disabled={true} value="Submit" className='formButton' />
            </form>
            <label className='formLabel'>
                <Link to="/login" className='link'>Back to login.</Link>
            </label>
        </div>
      <Footer/>
    </div>
    )
}

export default ForgotPassword