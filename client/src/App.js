import React from 'react';
import{Route,Routes} from 'react-router-dom'
import HomePage from './Pages/HomePage';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Policy from './Pages/Policy';
import PageNotFound from './Pages/PageNotFound';
import Register from './Pages/auth/Register';
import Login from "./Pages/auth/Login";
import Dashboard from './Pages/user/Dashboard';
import PrivateRoutes from './Components/Routes/Private';
import ForgotPassword from './Pages/auth/ForgotPassword';
import AdminRoute from './Components/Routes/AdminRoute';
import AdminDashboard from './Pages/admin/AdminDashboard';
import CreateProduct from './Pages/admin/CreateProduct';
import CreateCategory from './Pages/admin/CreateCategory';
import User from './Pages/admin/User';
import Profile from './Pages/user/Profile';
import Orders from './Pages/user/Orders';
import Product from './Pages/admin/Product';
import UpdateProduct from './Pages/admin/UpdateProduct';
import Search from './Pages/Search';
import ProductDetails from './Pages/ProductDetails';
import Categories from './Pages/Categories';
import CategoryProduct from './Pages/CategoryProduct';
import Cart from './Pages/Cart.js';
import AdminOrders from './Pages/admin/AdminOrders.js';

function App() {
  return (
    <>
    <Routes>
      

      <Route path="/" element={<HomePage/>}/>
      <Route path="/categories" element={<Categories/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/category/:slug" element={<CategoryProduct/>}/>
      <Route path="/product/:slug" element={<ProductDetails/>}/>
      <Route path="/search" element={<Search/>}/>
      <Route path="/dashboard" element={<PrivateRoutes />} >
      < Route path="user" element={<Dashboard/>}/>
      < Route path="user/profile" element={<Profile/>}/>
      < Route path="user/orders" element={<Orders/>}/>
      </Route>
      <Route path="/dashboard" element={<AdminRoute />} >
      < Route path="admin" element={<AdminDashboard/>}/>
      < Route path="admin/create-product" element={<CreateProduct/>}/>
      < Route path="admin/products/:slug" element={<UpdateProduct/>}/>
      < Route path="admin/create-category" element={<CreateCategory/>}/>
      < Route path="admin/Admin-user" element={<User/>}/>
      < Route path="admin/products" element={<Product/>}/>
      < Route path="admin/orders" element={<AdminOrders/>}/>
      </Route>
      <Route path="/forgot-Password" element={<ForgotPassword/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/policy" element={<Policy/>}/>
      <Route path="/*" element={<PageNotFound/>}/>
    </Routes>
      
      
    </>
  );
}

export default App;
