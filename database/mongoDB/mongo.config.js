const mongoose=require('mongoose')
require('dotenv').config()
const _=require('lodash')
const mongoConnect=async ()=>{
    let MONGO_URI;
    const MONGO_USER=process.env.MONGO_USER
    const MONGO_DB_NAME=process.env.MONGO_DB_NAME
    const MONGO_PASS=process.env.MONGO_PASS
    const MONGO_QUERY=process.env.MONGO_QUERY
    const MONGO_HOST=process.env.MONGO_HOST
    if(_.isNil(MONGO_USER)){
        MONGO_URI=`${process.env.MONGO_URI}`
    }else{
        MONGO_URI=`mongodb://localhost:27017/desafios`
    }
    mongoose.Promise=global.Promise
    await mongoose.connect(MONGO_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    console.info('mongo connected')
}
module.exports=mongoConnect