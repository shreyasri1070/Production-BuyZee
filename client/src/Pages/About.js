import React from 'react'
import Layout from '../Components/Layout/layout'
const About = () => {
  return (
    
        <Layout title={"About-BuyZee"}>
            <div class="row about">
    <div class="col-md-6">
      <img src="images/about.jpeg" alt="aboutus" style={{width:"100%"}}/>
    </div>
    <div class="col-md-6">
      <h2 className="bg-dark text-white text-center m-3 pb-1">Here It Is</h2>
      <p className=' p-3 d-flex justify-content-center m-4'>Welcome to BuyZee, your ultimate destination for seamless online shopping. At BuyZee, we redefine your shopping experience with a curated selection of top-notch products spanning fashion, electronics, home essentials, and more. Our user-friendly platform ensures effortless navigation and secure transactions, guaranteeing peace of mind with every purchase. Whether you're looking for the latest trends or timeless classics, BuyZee offers unparalleled convenience and reliability. With dedicated customer support and swift delivery, we strive to exceed your expectations. Join the BuyZee community today and discover a world of convenience, quality, and style at your fingertips.</p>
    </div>
  </div>


        </Layout>
      
  
  )
}

export default About
