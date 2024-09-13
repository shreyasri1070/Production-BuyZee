import express from 'express';
import {forgotPasswordController, getAllOrdersController, getOrdersController, getOrderStatusController, loginController, registerController,testController, updateProfileController} from '../controllers/registerController.js';
import { isAdmin, requireSignIn } from '../middlewares/authmiddleware.js';
//roter object
 const router=express.Router();
//REGISTER
router.post('/register',registerController)

//LOGIN
router.post('/login',loginController)

//Forgot Passsword
router.post('/forgot-Password',forgotPasswordController);
//test
router.get('/test',requireSignIn ,isAdmin,testController);

//protected user route auth
router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({Ok:true})
})
//protected admin route auth
router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({Ok:true})
})
//update profile 
router.put('/profile',requireSignIn,updateProfileController)

//orders
router.get("/orders", requireSignIn, getOrdersController);


//all-orders
router.get("/allorders", requireSignIn, isAdmin, getAllOrdersController);

//all-orders
router.put("/orderstatus/:id", requireSignIn, isAdmin, getOrderStatusController);

export default router


