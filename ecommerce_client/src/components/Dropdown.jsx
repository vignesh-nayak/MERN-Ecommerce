
import React from 'react';
import { Link } from 'react-router-dom';

const Dropdown = (props) => {
    const { title, menu} = props
  return (
    <div className='dropdown'>
        <div className='dropdown-menu'>{title}</div>
        <div className="dropdown-content">
            { menu.map(item => (<Link to={`/${item}`}><span className='text-captialize'>{item}</span></Link>))  }
        </div>
    </div>
  )
}

export default Dropdown