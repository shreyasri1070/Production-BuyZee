import React from 'react'
import Layout from '../../Components/Layout/layout'
import UserMenu from '../../Components/Layout/UserMenu'
import { useAuth } from '../../Context/auth'
const Dashboard = () => {
  const [auth]=useAuth();
  return (
    
    <Layout title={"BuyZee-Dashboard"}>
    <div className="container-fluid text-center my-3"> 
     {/* container fluid class make the width 100% at all breakpoint */}
 <div className="row">
   <div className="col-md-3"><UserMenu /></div>
   <div className="col-md-9">
   <div className="card">
 <div className="card-body">
   <h3>User Name: {auth?.user?.name}</h3>
 </div>
 <div className="card-body">
   <h3>User Email: {auth?.user?.email}</h3>
 </div>
 <div className="card-body">
   <h3>User Address: {auth?.user?.address}</h3>
 </div>
</div>

   </div>
 </div>
</div>

     </Layout>
  
    
  )
}

export default Dashboard
