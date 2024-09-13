import React from 'react'
import Layout from '../Components/Layout/layout'
import { useSearch } from '../Context/search'
const Search = () => {
    const [values,setValues]=useSearch();
  return (
    <Layout title={'search-result'}>
        <div className="container">
            <div className="text-center">
                <h2>Search Result</h2>
                <h6>{values?.results.length < 1?' No Product Found':`Found ${values?.results.length}`}</h6>
                <div className="d-flex flex-wrap">
      {
    values?.results.map((p)=>(
      <div className="card m-2" style={{width: '18rem'}} key={p.React_id}>
  <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
  <div className="card-body">
    <h5 className="card-title">{p.name}</h5>
    <p className="card-text">{p.description.substring(0,30)}...</p>
    <p className="card-text">${p.price}</p>
   
  <button className="btn btn-primary ms-1">Add To Cart</button>
  <button className="btn btn-secondary ms-1">See Details</button>

  
  </div>
</div>


    ))

  }


      </div>
            </div>
        </div>

    </Layout>
      
  )
}

export default Search
