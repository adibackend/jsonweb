const mongoose=require('mongoose')
const dotenv=require('dotenv')

dotenv.config()

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log('mongodb connected')
    }catch(e){
        console.log('mongodb connection error')
        process.exit(1)
    }
}
module.exports=connectDB