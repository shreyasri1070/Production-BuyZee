import React,{useState} from 'react'
import Layout from '../../Components/Layout/layout';
import axios from 'axios';
import { useNavigate ,useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../Context/auth';
const Login = () => {


    const [email,setEmail]=useState("")
   
    const [password,setPassword]=useState("");
    const [auth,setAuth]=useAuth();
    const navigate=useNavigate();
    const location=useLocation();
    // submit function
    const handleSubmit=async(e)=>{
      e.preventDefault()
      try{
        const res=await axios.post("/api/v1/auth/login",{email,password});
        if( res.data.success){
            console.log(res.data.message);
         toast.success(res.data && res.data.message);
         setAuth({...auth,
          user:res.data.user,
          token:res.data.token
         }
        )
        localStorage.setItem("auth",JSON.stringify(res.data))
          navigate(location.state||"/")

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
    <Layout title={"Login-BuyZee"}>
        <div className="form-container"> 
           
        
         <form onSubmit={handleSubmit} >
         <h2 className='title' >Login  Form </h2>
  
  <div className="mb-3">
    <label htmlFor="exampleInputEmail" className="form-label">Email</label>
    <input type="email" className="form-control" onChange={(e)=>setEmail(e.target.value)}  value={email} id="exampleInputEmail1" required />

  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" onChange={(e)=>setPassword(e.target.value)}  value={password}id="exampleInputPassword1" required />
  </div>
 

 <div style={{cursor:"pointer"}}>
  <p   onClick={()=>{navigate('/forgot-Password')}}>forgot password ?</p>
 </div>
  
 
  <button type="submit" className="btn btn-primary">Login</button>
</form>

        </div>
    
    </Layout>
  )
}

export default Login;
