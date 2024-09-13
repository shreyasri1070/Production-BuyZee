import React  from 'react';
import Layout from '../../Components/Layout/layout'
import AdminMenu from '../../Components/Layout/AdminMenu'
import { useEffect, useState } from 'react';
import axios from 'axios';
import  toast from 'react-hot-toast';
import CategoryForm from '../../Components/Form/CategoryForm';
import { Modal } from 'antd';



const CreateCategory = () => {


  const [categories,setCategories]=useState([]);
  const [name,setName]=useState("");
  const [visible,setVisible]=useState(false);
  const [selected,setSelected]=useState(null);
  const [update,setUpdate]=useState("")

  //get-categories

  const getAllCategory=async()=>{
    try{
      const { data }= await axios.get("/api/v1/category/all-category")
   
      if(data?.success){
       setCategories(data.category)
      
      }

    }catch(e){
      console.log(e);
      toast.error('something went wrong while getting category')

    }


  }

  const handleSubmit =async(e)=>{
    e.preventDefault();
    try{
      const {data}=await axios.post("/api/v1/category/create-category",{name});
      if(data?.success){
        toast.success(`${data.category.name} is created`)
        getAllCategory();

      }else{

        toast.error(data.message)
      }


    }
    catch(e){
      console.log(e);
      toast.error('something went wrong while creating category')

    }
  }

  //getDelete
  const handleDelete=async(pid)=>{
  
    try{
      const { data }=await axios.delete(`/api/v1/category/delete-category/${pid}`);
      if(data?.success){
        toast.success(`${data.category.name} is deleted`);
        getAllCategory();
      }else{

        toast.error(data.message)
      }
      

    } catch(e){
      console.log(e);
      toast.error('Error in deletion')

    }

  }

  //getUpdate
  const handleUpdate=async(e)=>{
   e.preventDefault();
    try{
      const { data }=await axios.put(`/api/v1/category/update-category/${selected._id}`,{name:update});
      if(data?.success){
        toast.success(`${update} is updated`);
        setUpdate('');
        setVisible(false);
        setSelected(null);
        getAllCategory();
      }else{

        toast.error(data.message)
      }
      

    } catch(e){
      console.log(e);
      toast.error('something went wrong in updation')

    }

  }
useEffect(()=>{
  getAllCategory();
},[])



  return (
    <>
     <Layout title={"DashBoard-createCategory"}>
     <div className="container-fluid text-center my-3"> 
     
  <div className="row">
    <div className="col-md-3"><AdminMenu /></div>
    <div className="col-md-9" >
      <div style={{display:"flex",justifyContent:"center",flexDirection:"column" ,alignItems:"center"}}>
    <h3  >Create Category</h3>
    <div className="p-3 w-50">
      <CategoryForm  handleSubmit={handleSubmit} value={name} setValue={setName} />
    </div></div>
    <div style={{display:"flex",justifyContent:"center",flexDirection:"column" ,alignItems:"center"}}>
    <h3>Manage Category</h3>
      <div className='w-75'>
     <table className="table">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    
    {categories?.map((c)=>(
        <>
      
        <tr>
        <td key={c._id}>{c.name}</td>
    
        
        <td> <button className='btn btn-primary m-2' onClick={()=>{setVisible(true); 
          setUpdate(c.name); setSelected(c);
        }}>Edit</button>
        <button className='btn btn-danger' onClick={()=>{handleDelete(c._id)}}>Delete</button>
        </td>
      
        </tr>
        </>

      ))}
    
  </tbody>
</table>

      </div>
      <Modal onCancel={()=>setVisible(false)} footer={null} open={visible}>
        <CategoryForm value={update} setValue={setUpdate} handleSubmit={handleUpdate}/>
      </Modal>
</div>
</div>

    </div>
  
</div>

      </Layout>
   
      
    </>
  )
}

export default CreateCategory
