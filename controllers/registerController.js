 import  userModel  from "../models/userModels.js";
import { comparePassword, hashPassword } from "../utilities/authash.js";
import jwt from "jsonwebtoken";
 
 export const registerController = async(req,res)=>{
    try{
        //get these attribute
        const {name,email,password,phone,address}=req.body;
        //validation
        if(!name){
            return res.send({message:'Name is required'})
        }
        if(!email){
            return res.send({message:'Email is required'})
        }
        if(!password){
            return res.send({message:'Password is required'})
        }
        if(!phone){
            return res.send({message:'Phone No. is required'})
        }
        if(!address){
            return res.send({message:'address is required'})
        }

        // check the existence of that user
        const  existingUser= await userModel.findOne({email})
        if(existingUser){
            return res.status(200).send({
                success:false,
                message:'Already register  please login'
            })
        }

        // register user
        const hashedPass=await hashPassword(password);
        //save
        const user= await new userModel({name,email,phone,address,password:hashedPass}).save();
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
      
};

//POST LOGIN
export const loginController=async(req,res)=>{
try{
    const {email,password}=req.body;
    // check the validation
    if(!email||!password){
        res.status(404).send({
            success:false,
            message:'Invalid email or pssword',

    })

}
//check user
const user=await userModel.findOne({email})
if(!user){
    return res.status(404).send({
        sucess:false,
        message:'email is not registered'

    })
    
}

const match =await comparePassword(password,user.password);
if(!match){
    return res.status(200).send({
        sucess:false,
        message:'password is incorrect'

    })
    
    
}

//token

const  token= await jwt.sign({_id:user._id},process.env.jwt_code,{expiresIn:'7d'});
 res.status(200).send({
    success:true,
    message:'Login succesfully',
    user:{
        _id: user._id,
        name:user.name,
        email:user.email,
        phone:user.phone,
        address:user.address


    },
    token,

});
}catch(e){
    res.status(500).send({
        success:false,
        message:'Error in login',
        e:e.message
    })


}


};

//Test (user/admin)

export const testController=(req,res)=>{
    try{
        res.send('protected middleware')
    } catch(error){
        console.log(error)
        res.send({error})
    }
   

}


