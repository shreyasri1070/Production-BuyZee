import categoryModel from '../models/categoryModels.js'
import slugify from 'slugify';
import productModels from '../models/productModels.js';

export  const createcategoryController = async(req,res)=>{
    try{
        const {name}=req.body;

        if(!name){
            return res.status(401).send({
                success:false,
                message:'Name is required'
            })

        }

        const existingCategory= await categoryModel.findOne({name});

        if(existingCategory){
            return res.status(200).send({
                success:true,
                message:'Category Already Existing'
            })
        }
        const category=await categoryModel({name,slug:slugify(name)}).save();
        res.status(201).send({
            success:true,
            message:'new category created',
            category
        })

    }catch(e){
        console.log(error);
        res.status(500).send({
            success:false,
            e,
            message:'Error in Category'
        })

    }

}

export const updatecategoryController=async(req,res)=>{
    try{
        const {name}=req.body;
        const {id}=req.params;
        const category= await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        res.status(200).send({
            success:true,
            message:'category updated',
            category
        })
        

    }catch(e){
        console.log(e);
        res.status(500).send({
            success:false,
            e,
            message:'Error in updating category'
        })

    }
}

export const allcategoryController =async(req,res)=>{
    try{
        const category=await categoryModel.find({});
        res.status(200).send({
            success:true,
            message:'All categories listed',
            category
        })


    }
    catch(e){
        console.log(e);
        res.status(500).send({
            success:false,
            e,
            message:'Error while getting category'
        })

    }

}

export const singlecategoryController = async(req,res)=>{
    try{

        const category=await categoryModel.findOne({slug:req.params.slug});
        res.status(200).send({
            success:true,
            message:'category listed',
            category
        })


    }
    catch(e){
        console.log(e);
        res.status(500).send({
            success:false,
            e,
            message:'Error while getting single category'
        })

    }

}

export const deletecategoryController=async(req,res)=>{
    try{

        const {id}=req.params;

        const category=await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success:true,
            message:'category deleted successfully',
            category
        })


    }
    catch(e){
        console.log(e);
        res.status(500).send({
            success:false,
            e,
            message:'Error in deletion category'
        })

    }

}

// producrt category

export const categoryProductController=async(req,res)=>{
    try {
        
        const category=await categoryModel.findOne({slug:req.params.slug});
        const product = await productModels.find({category}).populate('category');
        res.status(200).send({
            success:true,
            message:'product displayed successfully',
            product,
            category
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success:false,
            e,
            message:'Error in getting product from category'

        })
        
    }
}