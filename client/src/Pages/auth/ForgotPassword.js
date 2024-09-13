import React,{useState} from 'react'
import Layout from '../../Components/Layout/layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const ForgotPassword = () => {
    const [email,setEmail]=useState("")
    const [newPassword,setNewPassword]=useState("");
    const [answer,setAnswer]=useState("");
 

    const navigate=useNavigate();
   

    // submit function
    const handleSubmit=async(e)=>{
      e.preventDefault()
      try{
        const res=await axios.post("/api/v1/auth/forgot-Password",{email,newPassword,answer});
        if( res.data.success){
            console.log(res.data.message);
         toast.success(res.data && res.data.message);
         
       
          navigate("/login")

        }else{
            console.log(res.data.message);
            toast.error(res.data.message);
        }
      }

      catch(e){
        console.log(e);
        toast.error("Something went wrong")
      }
        
    };


  return (
    <Layout title={"ForgotPassword-BuyZee"}>
        <div className="form-container"> 
         <form onSubmit={handleSubmit} >
         <h2 className='title' >Reset Password Form </h2>
  
  <div className="mb-3">
    <label htmlFor="exampleInputEmail" className="form-label">Email</label>
    <input type="email" className="form-control" onChange={(e)=>setEmail(e.target.value)}  value={email} id="exampleInputEmail1" required />

  </div>
  <div className="mb-3">
    <label htmlFor="exampleInput" className="form-label">Which is your first school ?</label>
    <input type="text" className="form-control" onChange={(e)=>setAnswer(e.target.value)}  value={answer} id="exampleInputanswer1" required />

  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">New Password</label>
    <input type="password" className="form-control" onChange={(e)=>setNewPassword(e.target.value)}  value={newPassword}id="exampleInputPassword1" required />
  </div>
 
  <button type="submit" className="btn btn-primary">Reset</button>
</form>

        </div>
    
    </Layout>
  )
}

export default ForgotPassword;