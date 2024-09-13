import React from 'react'
import Layout from '../../Components/Layout/layout'
import AdminMenu from '../../Components/Layout/AdminMenu'
import { useEffect, useState } from 'react'
import axios from 'axios';
import  toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Select } from 'antd';
const {Option} = Select;
const CreateProduct = () => {
    const navigate=useNavigate();
  const [categories,setCategories]=useState([]);
  const [photo,setPhoto]=useState('');
  const [name,setName]=useState('');
  const [category,setCategory]=useState();
  const [description,setDescription]=useState('');
  const [price,setPrice]=useState('');
  const [quantity,setQuantity]=useState('');
  const [shipping,setShipping]=useState('');
  //get category
  const getAllCategory=async()=>{
    try{
      const { data }= await axios.get("/api/v1/category/all-category")
   
      if(data?.success){
        setCategories(data.category);
      }

    }catch(e){
      console.log(e);
      toast.error('something went wrong while getting category')

    }


  }

  //handleProduct
  const handleProduct=async(e)=>{
    e.preventDefault();

    try{
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
     formData.append('photo', photo);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('shipping', shipping);
      formData.append('quantity', quantity);
      const { data }=await axios.post("/api/v1/product/create-product",formData);
      if(data?.success){
        toast.success(`${data.name} is created`)
        navigate("/dashboard/admin/products")
       
      }else{

        toast.error(data.message)
       
        
      }


    }
    catch(e){
      console.log(e);
      console.log("something went wrong")
      toast.error('something went wrong while creating product')

    }
  }

  useEffect(()=>{
    getAllCategory();
  },[])
  return (

    <>
       <Layout title={"Dashboard-createProduct"}>
     <div className="container-fluid text-center my-3"> 
     
  <div className="row">
    <div className="col-md-3"><AdminMenu /></div>
    <div className="col-md-9">
 <div>
  <h1>Create Product</h1>
  <form onSubmit={handleProduct}>
  <div className="m-1 w-75">
    <Select variant={false} placeholder="Select a category" size='large'  className='form-select  mb-3' onChange={(value)=>{setCategory(value)}}>
      
     {categories?.map(c=>(
      <Option key={c._id} value={c._id}>
        {c.name}
      </Option>
     ))}
    </Select>

    <div className="mb-3">
      <label  className='btn btn-outline-secondary'>
        {photo?photo.name: "Upload Photo"}  
        <input type="file" name='photo' accept='image/*' onChange={(e)=>setPhoto(e.target.files[0])} hidden />
      </label>
    </div>
    <div className="mb-3 w-75">
      {photo && (
        <div className='text-center'>
          <img src={URL.createObjectURL(photo)} alt="product " height={'200px'} className='img img-responsive' />
        </div>
      )}
    </div>
    <div className="mb-3">
      <input type="text" placeholder="Enter the name" size='large'  className='form-control mb-3' value={name} onChange={(e)=>setName(e.target.value)} />
    </div>
    <div className="mb-3">
      <input type="text" placeholder="Enter the description" size='large'  className='form-control mb-3' value={description} onChange={(e)=>setDescription(e.target.value)} />
    </div>
    <div className="mb-3">
      <input type="number"  placeholder="Enter the price" size='large'  className='form-control mb-3' value={price} onChange={(e)=>setPrice(e.target.value)} />
    </div>
    <div className="mb-3">
      <input type="number"  placeholder="Enter the quantity" size='large'  className='form-control mb-3' value={quantity} onChange={(e)=>setQuantity(e.target.value)} />
    </div>
    <div className="mb-3">
    <Select variant={false} placeholder="Select the shipping" size='large'  className='form-select  mb-3' onChange={(value)=>{setShipping(value)}}>
      
      <Option value='0'>No</Option>
      <Option value='1'>Yes</Option>
     </Select>
    </div>

   

  </div>
  <button type="submit" className='btn btn-primary'>submit</button>
  </form>
 </div>

    </div>
  </div>
</div>

      </Layout>
   
    </>
  )
}

export default CreateProduct
