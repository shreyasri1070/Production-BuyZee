import mongoose from 'mongoose'

const ConnectDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.Mongo_url);
        console.log(`successfully connected to mongodb database ${conn.connection.host}`)
    }catch(e){
        console.log(`Error in mongodb is ${e}`);
    }
};
export default ConnectDB;