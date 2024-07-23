import React from 'react'
import Layout from '../Components/Layout/layout';
import { Link } from 'react-router-dom'
const PageNotFound = () => {
  return (
   <Layout title={"Not-Available"}>
      <div className="pnf ">
        <h1 className="pnf-heading">404</h1>
        <h3 className="pnf-title">OOPs ! Page Not Found</h3>
        <Link to="/" className="pnf-btn">Go back</Link>


      </div>
   </Layout>
  )
}

export default PageNotFound
