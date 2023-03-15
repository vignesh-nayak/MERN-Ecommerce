import React, { useState } from 'react';
import myLogo from '../assets/s-logo.png';
import menuIcon from '../assets/bars-solid.svg';
import cancelMenu from '../assets/xmark-solid.svg';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Dropdown from './Dropdown';
import './componentStyle.css';

const Navbar = (props) => {
    const [ searchString, setSearchString] = useState('');
    const [ responseNavbar, setResponsiveNavbar] = useState(false);
    const { searchFunction } = props;
    const location = useLocation();
    const isProductSearchAble = location.pathname === '/';
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    const searchFun = (e) => {
        e.preventDefault();
        setSearchString(e.target.value);
        searchFunction(e.target.value);
    }

    const menu = ['profile', 'orders', 'logout'];
  return (
    <div className='navbar'>
        <Link to='/' className='img'>
            <img src={myLogo} className='img' alt="No logo found" />
        </Link>
        <input type="text" className='searchBox' disabled={!isProductSearchAble} placeholder="Search for products here..." value={searchString} onChange={(e) => searchFun(e)}/>
        <ul className='menu'>
            <Link to='/'><li className='menuList'>Products</li></Link>
            {
                userInfo?.email !== undefined 
                ?
                <>
                 <Link to='/profile'>
                  <li className='menuList text-center'>
                    <Dropdown title={userInfo?.name} menu={menu}/>
                  </li>
                </Link>
                 <Link to='/cart'><li className='menuList text-center'>Cart({cartItems?.length || 0})</li></Link>
                </>
                :
                <>
                 <Link to='/register'><li className='menuList'>Register</li></Link>
                 <Link to='/login'><li className='menuList'>Login</li></Link>               
                </>
            }
        </ul>
        <div class="menu-toggle" >
            <img src={menuIcon} className='menu-icon' alt="No logo found" onClick={() => setResponsiveNavbar(responseNavbar => !responseNavbar)}/>
        {
          responseNavbar
          ?
          <div className='menu-res'>
            <ul>
              <Link to='/'><li className='menuList'>Products</li></Link>
              {
                  userInfo?.email !== undefined 
                  ?
                  <>
                  <Link>
                    <li className='menuList text-center'>
                      <Dropdown title={userInfo?.name} menu={menu}/>
                    </li>
                  </Link>
                  <Link to='/cart'><li className='menuList text-center'>Cart({cartItems?.length || 0})</li></Link>
                  </>
                  :
                  <>
                  <Link to='/register'><li className='menuList'>Register</li></Link>
                  <Link to='/login'><li className='menuList'>Login</li></Link>               
                  </>
              }
          </ul>
            <img src={cancelMenu} className='canccel-icon' alt="No logo found" onClick={() => setResponsiveNavbar(responseNavbar => !responseNavbar)}/>
        </div>
        :
        <div></div>
        }
        </div>
    </div>
  )
}

export default Navbar;