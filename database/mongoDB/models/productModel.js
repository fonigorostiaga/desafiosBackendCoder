const mongoose=require('mongoose')
const productModel=mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    code:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model('productos',productModel)