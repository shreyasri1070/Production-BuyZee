import { useEffect,useState } from "react";
import { useAuth } from "../../Context/auth";
import { Outlet} from 'react-router-dom';
// outlet is used for nested routing
import axios from "axios";

import Spinner from "../Spinner.js";

export default  function AdminRoute(){
    const [Ok,setOk]=useState(false);
    const [auth,setAuth]=useAuth();

    useEffect(()=>{

        const authCheck=async()=>{
            const res=await axios.get('/api/v1/auth/admin-auth')

            if(res.data.Ok){
                setOk(true)
            }else{
                setOk(false)
            }

        }

        if(auth?.token) authCheck();

    },[auth?.token]);

    return Ok ? <Outlet /> :<Spinner path="" />

}