import express from 'express';

import { isAdmin, requireSignIn } from '../middlewares/authmiddleware.js';
import {allcategoryController, createcategoryController, deletecategoryController, singlecategoryController, updatecategoryController } from '../controllers/categoryController.js';

const router=express.Router();

//create-category
router.post("/create-category",requireSignIn,isAdmin,createcategoryController)
//update-category
router.put("/update-category/:id",requireSignIn,isAdmin,updatecategoryController)

//get all caategory
router.get("/all-category",allcategoryController);
//get single category
router.get("/single-category/:slug",singlecategoryController);
//delete cateegory
router.delete("/delete-category/:id", requireSignIn,isAdmin,deletecategoryController)


export default router;