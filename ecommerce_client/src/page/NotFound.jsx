import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useLocation } from 'react-router-dom';

const NotFound = () => {
  const location = useLocation();
  return (
    <div className='main'>
      <Navbar/>
      <div className='noProductFound text-center'>
        <div >
          Page - "{location.pathname}" Not Found
        </div>
        <Link className='text-white' to={'/'}>
          Go to home
        </Link>
      </div> 
      <Footer/>
    </div>
  )
}

export default NotFound