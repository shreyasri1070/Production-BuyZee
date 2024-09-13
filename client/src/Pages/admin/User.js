import React from 'react'
import Layout from '../../Components/Layout/layout'
import AdminMenu from '../../Components/Layout/AdminMenu'

const User = () => {
  return (
    <>
     <Layout title={"Dashboard-AllUser"}>
     <div className="container-fluid text-center my-3"> {/* container fluid class make the width 100% at all breakpoint */}
  <div className="row">
    <div className="col-md-3"><AdminMenu /></div>
    <div className="col-md-9">
  <div className="card">
  <h1>user</h1>
</div>

    </div>
  </div>
</div>

      </Layout>
   
      
    </>
  )
}

export default User
