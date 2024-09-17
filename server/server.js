import  express  from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose'
import ConnectDB from '../config/db.js'; // In ES6 we have to give module extension to import
import authRoute from '../Routes/authroute.js';
import categoryRoutes from '../Routes/categoryRoutes.js';
import productRoutes from '../Routes/productRoutes.js';
import cors from 'cors';
import path from 'path' ;

import { fileURLToPath } from 'url';
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);
const app=express();
//config env
dotenv.config({path:'../.env'});

// databsae conn
ConnectDB();


//middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'))

app.use(express.static(path.join(__dirname,'../client/build')))
//routes
app.use("/api/v1/auth",authRoute)
app.use("/api/v1/category",categoryRoutes)
app.use("/api/v1/product",productRoutes)

//api
app.use('*',function(req,res){
    res.sendFile(path.join(__dirname,'../client/build/index.html'))
})
//Port
const PORT=process.env.PORT||8000;

app.listen(PORT,()=>{
    console.log(`Server running at ${PORT} `.bgCyan.white)
})
