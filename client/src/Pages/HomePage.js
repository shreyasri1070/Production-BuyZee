import React ,{useState,useEffect }from 'react'
import Layout from '../Components/Layout/layout'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useCart } from '../Context/cart';
import { Checkbox ,Radio} from 'antd';
import { Prices } from '../Components/Price';


const HomePage = () => {
  const navigate=useNavigate();
    const [cart,setCart]=useCart()
  const[categories,setCategories]=useState([]);
  const [products,setProducts]=useState([]);
  const [checked,setChecked]=useState([]);
  const [radio, setRadio]=useState([]);

  const [total,setTotal]=useState(0);
  const [page,setPage]=useState(1);
  const [loading,setLoading]=useState(false)

  //get category
  const getAllCategory=async()=>{
    try{
      const { data }= await axios.get("/api/v1/category/all-category")
   
      if(data?.success){
        setCategories(data.category);
      }

    }catch(e){
      console.log(e);
    }
  }
  useEffect(()=>{
    getAllCategory();
    getTotal();
  },[])

  //getting All Product
  const getAllProduct=async()=>{
try {
  setLoading(true);
  const { data }=await axios.get(`/api/v1/product/product-list/${page}`);
  setLoading(false);
  setProducts(data.products);


} catch (error) {
  setLoading(false)
  console.log(error);
  toast.error('something went wrong while getting product')
  
}

  }

  useEffect(()=>{
   if(!checked.length||!radio.length) getAllProduct();
  },[checked.length,radio.length]);

  useEffect(()=>{
    if(checked.length||radio.length)  filterProduct();
  },[checked,radio])

  //handle-filter

  const handleFilter=async(value,id)=>{
    try {
      let all=[...checked]
      if(value){
        all.push(id)
      }else{
        all=all.filter((c)=> c!==id);
      }
      setChecked(all);
      
    } catch (error) {
      console.log(error)
      
    }
  }
 //Filter-Product
  const filterProduct =async()=>{
    try {
      
      const { data }=await axios.post('/api/v1/product/filter-product',{checked,radio,});
        setProducts(data?.products);

    } catch (error) {
      console.log(error);
      
    }
  }

    //getTOtal cOunt
    const getTotal = async () => {
      try {
        const { data } = await axios.get("/api/v1/product/product-count");
      
        setTotal(data?.total);
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
      if (page === 1) return;
      loadMore();
    }, [page]);

     //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
    
 
  return (
    <Layout title={"BuyZee-Home"}>
   <div className="row">
    <div className="col-md-2">
      <h5 className="text-center">Filter By Category</h5>
      <div className="d-flex flex-column mx-2">
         {categories?.map(c=>(
          <Checkbox key={c._id} onChange={(e)=>handleFilter(e.target.checked,c._id)}>
            {c.name}
          </Checkbox>
         ))}
         </div>
         <h5 className="text-center">Filter By Price</h5>
      <div className="d-flex flex-column mx-2">
        <Radio.Group onChange={(e)=>setRadio(e.target.value)}>
          {
            Prices?.map((p)=>(
              <div key={p._id}>
                <Radio value={p.array}>{p.name}</Radio>
              </div>
            ))
          }
        </Radio.Group>
         </div>
         <div className="d-flex flex-column">
          <button className='btn btn-warning' onClick={()=>{window.location.reload()}}>Reset</button>
         </div>
      
    </div>
    <div className="col-md-9">
      
      <h1 className="text-center">All Product</h1>
      <div className="d-flex flex-wrap">
      {
    products?.map((p)=>(
      <div className="card m-2" style={{width: '18rem'}} key={p._id}>
  <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
  <div className="card-body">
    <h5 className="card-title">{p.name}</h5>
    <p className="card-text">{p.description.substring(0,30)}...</p>
    <p className="card-text">${p.price}</p>
   
  <button className="btn btn-primary ms-1" onClick={()=>{setCart([...cart,p]); toast.success("Product Added to Cart")}}>Add To Cart</button>
  <button className="btn btn-secondary ms-1" onClick={()=>{navigate(`/product/${p.slug}`)}}>See Details</button>

  
  </div>
</div>


    ))

  }


      </div>
      <div className='m-2 p-3'>
    {    products&&products.length <total &&(
    <button className='btn btn-success' onClick={(e)=>{
      e.preventDefault();
      setPage(page+1);
    }} >{
    loading?"Loading..":"Loadmore"
    }</button>
      
    ) }
      </div>
    </div>

   
   </div>
  
</Layout>
  )
}

export default HomePage
