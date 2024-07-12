import  express  from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose'
import ConnectDB from '../config/db.js'; // In ES6 we have to give module extension to import
import authRoute from '../Routes/authroute.js';
const app=express();
//config env
dotenv.config({path:'../.env'});

// databsae conn
ConnectDB();


//middleware
app.use(express.json());
app.use(morgan('dev'))
//routes
app.use("/api/v1/auth",authRoute)
//api
app.get('/',(req,res)=>{
    res.send({
        message:'Welcome to E-Commerce app'
    })
})
//Port
const PORT=process.env.PORT||8000;

app.listen(PORT,()=>{
    console.log(`Server running at ${PORT} `.bgCyan.white)
})