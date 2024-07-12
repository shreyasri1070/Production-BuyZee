import bcrypt from 'bcrypt';
export const hashPassword=async(password)=>{
    try{
        const round=10;
        const hashedPass=await bcrypt.hash(password,round)
        return hashedPass;
    }
    catch(e){
        console.log(e);
    }
}

export const comparePassword=async(password,hashedPass)=>{
    return bcrypt.compare(password,hashedPass)
}