import jwt from 'jsonwebtoken';
import userModels from '../models/userModels.js';

//protected route token base
// next is used to verify untill its not verify function doesnt send response
export const requireSignIn=async(req,res,next)=>{
    try{
        const decode=jwt.verify(req.headers.authorization,process.env.jwt_code);
       req.user=decode;
        next();
    }
    catch(e){
        console.log(e);

    }
   


}
//admin/useracess
export const isAdmin= async(req,res,next)=>{
    try{
        const user=await userModels.findById(req.user._id)
        if(user.role!==1){
            return res.status(401).send({

         
                success:false,
                message:'Unauthorized Access'
            }
                
            )
        }
        else{
            next();
        }
    }catch(error){
        console.log(error)
        res.send({
            success:false,
            error,
            message:'Error in admin middleware'
        })
    }
}