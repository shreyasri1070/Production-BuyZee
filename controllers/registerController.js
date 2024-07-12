 import { userModel } from "../models/userModels";
import { hashPassword } from "../utilities/authash";
 
 export const registerController = async(req,res)=>{
    try{
        //get these attribute
        const {name,email,password,phone,address,role}=req.body;
        //validation
        if(!name){
            return res.send({error:'Name is required'})
        }
        if(!email){
            return res.send({error:'Email is required'})
        }
        if(!password){
            return res.send({error:'Password is required'})
        }
        if(!phone){
            return res.send({error:'Phone No. is required'})
        }
        if(!address){
            return res.send({error:'address is required'})
        }

        // check the existence of that user
        const  existingUser= await userModel.findOne({email})
        if(existingUser){
            return res.status(200).send({
                success:true,
                message:'Already register  please login'
            })
        }

        // register user
        const hashedPass=await hashPassword(password);
        //save
        const user=new userModel({name,email,phone,address,password:hashedPass,role}).save();
        res.status(200).send({
            success:true,
            message:'user register succesfully',
            user
        })

    }catch(error){
        console.log(error);

        res.status(500).send({
            success:false,
            message:'Error in Registration',
            error
        })
    }
      
}
