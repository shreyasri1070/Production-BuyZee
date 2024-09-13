
import React from 'react'
import Layout from '../../Components/Layout/layout'
import AdminMenu from '../../Components/Layout/AdminMenu'
import { useEffect, useState } from 'react'
import axios from 'axios';
import  toast from 'react-hot-toast';
import { useNavigate ,useParams} from 'react-router-dom';
import { Select } from 'antd';
const {Option} = Select;
const UpdateProduct = () => {
    const params=useParams();
    const navigate=useNavigate();
    const [id,setId]=useState("");
  const [categories,setCategories]=useState([]);
  const [photo,setPhoto]=useState('');
  const [name,setName]=useState('');
  const [category,setCategory]=useState("");
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
  //get single product
  const getsingleproduct=async()=>{
    try {
        const { data }=await axios.get(`/api/v1/product/get-product/${params.slug}`);
      
        if(data?.success){
          setName(data.product.name)
          setId(data.product._id)
          setDescription(data.product.description);
          setQuantity(data.product.quantity);
          setPrice(data.product.price);
          setCategory(data.product.category._id);
          
         
          setShipping(data.product.shipping);
        }
        else{
          toast.error('Product not found');
          navigate("/dashboard/admin/products");
        }
        
        
    } catch (error) {
        console.log(error);
      toast.error('something went wrong while getting product')
        
    }
  }
  useEffect(()=>{
    getsingleproduct();
    //eslint-disable-next-line
  },[])

  //handleProduct
  const handleUpdate=async(e)=>{
    e.preventDefault();

    try{
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
    photo && formData.append('photo', photo);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('shipping', shipping);
      formData.append('quantity', quantity);
      const { data }=await axios.put(`/api/v1/product/update-product/${id}`,formData);
      if(data?.success){
        toast.success(`${data.name} is updated`)
        navigate("/dashboard/admin/products")
       
      }else{

        toast.error(data.message)

       
        
      }


    }
    catch(e){
      console.log(e);
      console.log("something went wrong")
      toast.error('something went wrong while updating product')

    }
  }

  useEffect(()=>{
    getAllCategory();
  },[])
  //delete a product
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this product ? ");
      if (!answer) return;
    // eslint-disable-next-line 
      const { data } = await axios.delete(
        `/api/v1/product/delete-product/${id}`
      );
      toast.success("product DEleted Succfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Dashboard-createProduct"}>
     <div className="container-fluid text-center my-3"> 
     
  <div className="row">
    <div className="col-md-3"><AdminMenu /></div>
    <div className="col-md-9">
 <div>
  <h1>Update Product</h1>
  <form onSubmit={handleUpdate}>
  <div className="m-1 w-75">
    <Select variant={false} placeholder="Select a category" size='large'  className='form-select  mb-3' onChange={(value)=>{setCategory(value)}} value={category}>
      
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
      {photo ? (
        <div className='text-center'>
          <img src={URL.createObjectURL(photo)} alt="product " height={'200px'} className='img img-responsive' />
        </div>
      ):(<div className='text-center'>
        <img src={`/api/v1/product/product-photo/${id}`} alt="product " height={'200px'} className='img img-responsive' />
      </div>)}
    </div>
    <div className="mb-3">
      <input type="text" placeholder="Enter the name" size='large'  className='form-control mb-3' value={name} onChange={(e)=>setName(e.target.value)} />
    </div>
    <div className="mb-3">
      <textarea type="text" placeholder="Enter the description" size='large'  className='form-control mb-3' value={description} onChange={(e)=>setDescription(e.target.value)} />
    </div>
    <div className="mb-3">
      <input type="number"  placeholder="Enter the price" size='large'  className='form-control mb-3' value={price} onChange={(e)=>setPrice(e.target.value)} />
    </div>
    <div className="mb-3">
      <input type="number"  placeholder="Enter the quantity" size='large'  className='form-control mb-3' value={quantity} onChange={(e)=>setQuantity(e.target.value)} />
    </div>
    <div className="mb-3">
    <Select variant={false} placeholder="Select the shipping" size='large'  className='form-select  mb-3' onChange={(value)=>{setShipping(value)}} value={shipping?'Yes':'No'}>
      
      <Option value='0'>No</Option>
      <Option value='1'>Yes</Option>
     </Select>
    </div>

   

  </div>
  <div className="mb-3"><button type="submit" className='btn btn-primary'>Update Product</button></div>
  
  <div className="mb-3">
                <button className="btn btn-danger" onClick={handleDelete}>
                  DELETE PRODUCT
                </button>
              </div>
  </form>
 </div>

    </div>
  </div>
</div>

      </Layout>
  )
}

export default UpdateProduct
