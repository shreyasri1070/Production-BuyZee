import React from 'react'
import Layout from '../../Components/Layout/layout'
import AdminMenu from '../../Components/Layout/AdminMenu'
import { useAuth } from '../../Context/auth'

const AdminDashboard = () => {

  const [auth]=useAuth();

  return (
    
      <Layout title={"BuyZee-AdminDashboard"} src='/logo192.png'>
     <div className="container-fluid text-center my-3"> 
      {/* container fluid class make the width 100% at all breakpoint */}
  <div className="row">
    <div className="col-md-3"><AdminMenu /></div>
    <div className="col-md-9">
    <div className="card">
  <div className="card-body">
    <h3>Admin Name: {auth?.user?.name}</h3>
  </div>
  <div className="card-body">
    <h3>Admin Email: {auth?.user?.email}</h3>
  </div>
  <div className="card-body">
    <h3>Admin Address: {auth?.user?.address}</h3>
  </div>
</div>

    </div>
  </div>
</div>

      </Layout>
   
  )
}

export default AdminDashboard
