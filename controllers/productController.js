import productModel from '../models/productModels.js';
import slugify from 'slugify';
import fs from 'fs';
import dotenv from 'dotenv'
import braintree from 'braintree';
import orderModels from '../models/orderModels.js';
dotenv.config({path:'../.env'});
//payment gateway
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BrainTee_Merchant_id,
    publicKey: process.env.BrainTee_Public_Key,
    privateKey: process.env.BrainTee_Private_Key,
  });
export const createproductController=async(req,res)=>{
    try{
        const {name, description,price,category,quantity,shipping}= req.fields;
        const {photo}= req.files;
        //validation
        switch (true) {
            case !name:
                return res.status(500).send({error:'Name is required'});
            case !photo&&photo.size>1000000:
                    return res.status(500).send({error:'photo is required and should be less than 1mb'});  
            case !description:
                        return res.status(500).send({error:'description is required'});
            case !price:
                        return res.status(500).send({error:'price is required'});
            case !quantity:
                        return res.status(500).send({error:'quantiy is required'});
          
            case !category:
                            return res.status(500).send({error:'category is required'});
           
        }

        const product= await productModel({...req.fields,slug:slugify(name)})
        if(photo){
            product.photo.data=fs.readFileSync(photo.path);
            product.photo.contentType=photo.type;
        }
        await product.save();
        res.status(200).send({
            success:true,
            message:"Product created successfully",
            product
        })
        

    }catch(e){
        console.log(error);
        res.status(500).send({
            success:false,
            e,
            message:'Error in Product'
        })

    }
}

export const getproductController=async(req,res)=>{
    try{
        const product=await productModel.find({}).populate("category").select("-photo").limit(12).sort({createdAt:-1})
        res.status(200).send({
            success:true,
            message:"All Product",
            product,
            total_count:product.length,
        })
    }catch(e){
        console.log(error);
        res.status(500).send({
            success:false,
            e,
            message:'Error in getting Product'
        })

    }
}

export const singleproductController=async(req,res)=>{
    try{

        const product=await productModel.findOne({slug:req.params.slug}).select("-photo").populate("category")
       
        res.status(200).send({
            success:true,
            message:"One Product",
            product,
           
            
           
        })
        
    }catch(e){
        console.log(e);
        res.status(500).send({
            success:false,
            e,
            message:'Error in getting Product'
        })

    }
}
export const productphotoController=async(req,res)=>{
    try{

        const product=await productModel.findById(req.params.pid).select("photo")
            if(product.photo.data){
                res.set('Content-type',product.photo.contentType)
                res.status(200).send(product.photo.data)

            }
        
    }catch(e){
        console.log(e);
        res.status(500).send({
            success:false,
            e,
            message:'Error in getting Photo'
        })

    }
}

export const deleteproductController=async(req,res)=>{
    try{

        const product=await productModel.findByIdAndDelete(req.params.pid).select("-photo")

        res.status(200).send({
            success:true,
            message:" Product deleted ",
            product,
           
        })
    }catch(e){
        console.log(error);
        res.status(500).send({
            success:false,
            e,
            message:'Error in deleting Product'
        })

    }
}

export const updateproductController=async(req,res)=>{
    try{
        const {name, slug,description,price,category,quantity,shipping}= req.fields;
        const {photo}= req.files;
        //validation
        switch (true) {
            case !name:
                return res.status(500).send({error:'Name is required'});
            case photo && photo.size >1000000:
                    return res.status(500).send({error:'photo is required and should be less than 1mb'});  
            case !description:
                        return res.status(500).send({error:'description is required'});
            case !price:
                        return res.status(500).send({error:'price is required'});
            case !quantity:
                        return res.status(500).send({error:'quantiy is required'});
          
            case !category:
                            return res.status(500).send({error:'category is required'});
           
        }

        const product= await productModel.findByIdAndUpdate(req.params.pid,{...req.fields,slug:slugify(name)},{new:true})
        if(photo){
            product.photo.data=fs.readFileSync(photo.path);
            product.photo.contentType=photo.type;
        }
        await product.save();
        res.status(201).send({
            success:true,
            message:"Product updated successfully",
            product
        })
        

    }catch(e){
        console.log(e);
        res.status(500).send({
            success:false,
            e,
            message:'Error while updating Product'
        })

    }
}

export const productfilterController=async(req,res)=>{
    try {
        const { checked, radio }=req.body;
        let args={};
        if(checked.length > 0) args.category=checked;
        if(radio.length) args.price={$gte: radio[0],$lte:radio[1]};
        const products = await productModel.find(args);
        res.status(200).send({
            success:true,
            products
        })
        
    } catch (e) {
        console.log(e);
        res.status(400).send({
            success:false,
            e,
            message:'Error while filtering Product'
        })
        
    }

}

export const productCountController = async (req, res) => {
    try {
      const total = await productModel.find({}).estimatedDocumentCount();
      res.status(200).send({
        success: true,
        total,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        message: "Error in product count",
        error,
        success: false,
      });
    }
  };


  // product list base on page
export const productListController = async (req, res) => {
    try {
      const perPage = 2;
      const page = req.params.page ? req.params.page : 1;
      const products = await productModel
        .find({})
        .select("-photo")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ createdAt: -1 });
      res.status(200).send({
        success: true,
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "error in per page ",
        error,
      });
    }
  };


  // search product
export const searchProductController = async (req, res) => {
    try {
      const { keyword } = req.params;
      const results = await productModel
        .find({
          $or: [
            { name: { $regex: keyword, $options: "i" } },  // it make case insensitive
            { description: { $regex: keyword, $options: "i" } },
          ],
        })
        .select("-photo");
      res.json(results);
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error In Search Product API",
        error,
      });
    }
  };
  //similar product
export const relatedProductController=async(req,res)=>{

    try{
        const { pid, cid } = req.params;
        const products = await productModel
          .find({
            category: cid,
            _id: { $ne: pid }, // ne signify not included
          })
          .select("-photo")
          .limit(3)
          .populate("category");
        res.status(200).send({
          success: true,
          products,
        });
    }
    catch(e){
        console.log(error);
        res.status(400).send({
            success:false,
            message:'error while getting related product',
            error
        })
    }

}

//Paymentgateway token controller

export const braintreeTokenController=async(req,res)=>{
    try {
        gateway.clientToken.generate({}, function (err, response) {
          if (err) {
            res.status(500).send(err);
          } else {
            res.send(response);
          }
        });
      } catch (error) {
        console.log(error);
      }

}

//Payment gateway

export const braintreePaymentController=async(req,res)=>{
    try {
        const { nonce, cart } = req.body;
        let total = 0;
        cart.map((i) => {
          total += i.price;
        });
        let newTransaction = gateway.transaction.sale(
          {
            amount: total,
            paymentMethodNonce: nonce,
            options: {
              submitForSettlement: true,
            },
          },
          function (error, result) {
            if (result) {
              const order = new orderModels({
                products: cart,
                payment: result,
                buyer: req.user._id,
              }).save();
              res.json({ ok: true });
            } else {
              res.status(500).send(error);
            }
          }
        );
      } catch (error) {
        console.log(error);
      }
}