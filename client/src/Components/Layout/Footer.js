import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='footer'>
     <h4 className='text-center'>All Rights Are Reserved &copy; BuyZee</h4>
     <p className=" fs-6 text-center mt-2 ">
      <Link to='/about' className='px-1'>About </Link>|
      <Link to='/policy' className='px-1'>Policy </Link>|
      <Link to='/contact' className='px-1'>Contact Us</Link>


     </p>
    </div>
  )
}

export default Footer
