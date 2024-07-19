import express from 'express';
import {loginController, registerController,testController} from '../controllers/registerController.js';
import { isAdmin, requireSignIn } from '../middlewares/authmiddleware.js';
//roter object
 const router=express.Router();
//REGISTER
router.post('/register',registerController)

//LOGIN
router.post('/login',loginController)
//test
router.get('/test',requireSignIn ,isAdmin,testController)
export default router


