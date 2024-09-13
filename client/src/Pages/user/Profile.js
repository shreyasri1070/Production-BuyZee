import React ,{useState,useEffect} from 'react'
import Layout from '../../Components/Layout/layout'
import UserMenu from '../../Components/Layout/UserMenu'
import axios from 'axios';
import { useAuth } from '../../Context/auth';
import toast from 'react-hot-toast';
const Profile = () => {
  const [auth,setAuth]=useAuth();
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [phone,setPhone]=useState("")
  const [address,setAddress]=useState("")
  const [password,setPassword]=useState("");
  
  useEffect(()=>{
    const {name,email,phone,address}=auth?.user;
    setName(name);
    setEmail(email);
    setPhone(phone);
    
    setAddress(address);
  },[auth?.user]);

  // submit function
  const handleSubmit=async(e)=>{
    e.preventDefault()
    try{
      const {data}=await axios.put("/api/v1/auth/profile",{name,email,password,phone,address});
     
      if (data?.errro) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
     
    }
    catch(e){
      console.log(e);
      toast.error("Something went wrong")
    }
      

  };
  return (
    <>
    <Layout title={"BuyZee-Profile"}>
    <div className="container-fluid text-center my-3"> 
    
 <div className="row">
   <div className="col-md-3"><UserMenu /></div>
   <div className="col-md-9">
   <div className="card">
   <div className="form-container"> 
   <form onSubmit={handleSubmit} >
         <h2 className='title' >User Profile </h2>
  <div className="mb-3 mt-3">
    <label htmlFor="exampleInputName" className="form-label">Name</label>
    <input type="text" className="form-control" onChange={(e)=>setName(e.target.value)} value={name}id="exampleInputName1"  />

  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail" className="form-label">Email</label>
    <input type="email" className="form-control" onChange={(e)=>setEmail(e.target.value)}  value={email} id="exampleInputEmail1" disabled />

  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)}  id="exampleInputPassword1" />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputName" className="form-label">Address</label>
    <input type="text" className="form-control"  onChange={(e)=>setAddress(e.target.value)}  value={address} id="exampleInputAddress1" />

  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputName" className="form-label">Phone</label>
    <input type="tel" className="form-control"  onChange={(e)=>setPhone(e.target.value)}  value={phone} id="exampleInputPhone1" />

  </div>

  
 
  <button type="submit" className="btn btn-primary">Update</button>
</form>
   
</div>

   </div>
 </div>
 </div>
</div>

     </Layout>
      
    </>
  )
}

export default Profile
