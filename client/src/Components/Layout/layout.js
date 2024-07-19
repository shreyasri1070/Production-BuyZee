import React from 'react'
import Header from './Header';
import Footer from './Footer'
const Layout = (props) => {
  return (
    <>
      < Header/>
      <main style={{minHeight:"82.6vh"}}>{props.children}</main>
      <Footer/>
    </>
  )
}

export default Layout
