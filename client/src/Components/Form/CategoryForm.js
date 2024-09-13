import React from 'react'

const CategoryForm = ({handleSubmit,value,setValue}) => {
  return (
    <>
    <form  onSubmit={handleSubmit}>
   <div className="mb-3">
  
  <input type="text" className="form-control"  placeholder="Enter the category" value={value} onChange={(e)=>{
    setValue(e.target.value);
  }} />
  <button type="submit"  className='btn btn-primary m-3'>submit</button>
</div>


    </form>
      
    </>
  )
}

export default CategoryForm
