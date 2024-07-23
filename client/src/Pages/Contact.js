import React from 'react';
import Layout from '../Components/Layout/layout';
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
   
      <Layout title={"Contact-us"}>
    <div class="row contact">
    <div class="col-md-6 mt-5 px-5">
      <img src="images/contactus.jpeg" alt="Contact us" style={{width:"100%"}}/>
    </div>
    <div class="col-md-6">
      <h2 className="bg-dark text-white text-center m-3 pb-1">Contact Us</h2>
      <p className=' p-3 d-flex justify-content-center m-4'>For any queries and information about any product and services , Conatct us , We are available for you  24/7</p>
      <p className="mt-3 px-5"> <MdEmail/>: www.help@buyzee.com</p>
     <p className="mt-3 px-5"><FaPhoneAlt/>: 012-3456789</p>
     <p className="mt-3 px-5"><BiSupport/>: 1800-1234-1234</p>
    </div>
  </div>

</Layout>
    
  )
}

export default Contact;
