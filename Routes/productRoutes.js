import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authmiddleware.js';
import {  braintreePaymentController, braintreeTokenController, createproductController, deleteproductController, getproductController, productCountController, productfilterController, productListController, productphotoController, relatedProductController, searchProductController, singleproductController, updateproductController } from '../controllers/productController.js';
import formidable from 'express-formidable';
import { categoryProductController } from '../controllers/categoryController.js';

const router=express.Router();

// create product;
router.post("/create-product",requireSignIn,isAdmin,formidable(),createproductController)
//get product
router.get("/get-product",getproductController);
//single-product
router.get("/get-product/:slug",singleproductController)
//get photo
router.get("/product-photo/:pid",productphotoController)
//delete-product
router.delete("/delete-product/:pid",requireSignIn,isAdmin,deleteproductController)
//update-product
router.put("/update-product/:pid",requireSignIn,isAdmin,formidable(),updateproductController);

//filter-product
router.post("/filter-product",productfilterController)

//product count
router.get('/product-count',productCountController);

//product per-page

router.get('/product-list/:page',productListController);

//search-product

router.get("/search/:keyword", searchProductController);
//similar-product
router.get('/related-product/:pid/:cid',relatedProductController);

//category-wise product
router.get('/productcategory/:slug',categoryProductController)

// payment token

 router.get('/braintree/token',braintreeTokenController);

// // payment gateway

 router.post('/braintree/payment',requireSignIn,braintreePaymentController)



export default router;
