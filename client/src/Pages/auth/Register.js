import React,{useState} from 'react'
import Layout from '../../Components/Layout/layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
const Register = () => {

    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [phone,setPhone]=useState("")
    const [address,setAddress]=useState("")
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    // submit function
    const handleSubmit=async(e)=>{
      e.preventDefault()
      try{
        const res=await axios.post("/api/v1/auth/register",{name,email,password,phone,address});
        if(res && res.data.success){
         toast.success(res.data.message);
          navigate("/login")

        }else{
            toast.error(res.data.message);
        }
       
       
      }
      catch(e){
        console.log(e);
        toast.error("Something went wrong")
      }
        

    };
  return (
    <Layout title={"Register-BuyZee"}>
        <div className="form-container"> 
           
        
         <form onSubmit={handleSubmit} >
         <h2 className='title' >Register  Form </h2>
  <div className="mb-3 mt-3">
    <label htmlFor="exampleInputName" className="form-label">Name</label>
    <input type="text" className="form-control" onChange={(e)=>setName(e.target.value)} value={name}id="exampleInputName1" required />

  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail" className="form-label">Email</label>
    <input type="email" className="form-control" onChange={(e)=>setEmail(e.target.value)}  value={email} id="exampleInputEmail1" required />

  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" onChange={(e)=>setPassword(e.target.value)}  value={password}id="exampleInputPassword1" required />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputName" className="form-label">Address</label>
    <input type="text" className="form-control"  onChange={(e)=>setAddress(e.target.value)}  value={address} id="exampleInputAddress1" required />

  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputName" className="form-label">Phone</label>
    <input type="tel" className="form-control"  onChange={(e)=>setPhone(e.target.value)}  value={phone} id="exampleInputPhone1"required />

  </div>
  
 
  <button type="submit" className="btn btn-primary">Register</button>
</form>

        </div>
    
    </Layout>
  )
}

export default Register
