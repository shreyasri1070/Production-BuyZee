import express from 'express';
import {registerController} from '../controllers/registerController.js';
//roter object
 const router=express.Router();
//REGISTER
router.post('/register',registerController)

export default router


