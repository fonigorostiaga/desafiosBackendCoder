const express=require('express')
const productRouter=require('./productos/productos.router')
const router=express.Router()

router.get('/health',(_req,res)=>{
    res.status(200).json({
        success:true,
        health:'up',
        environment:process.env.ENVIRONMENT
    })
})
.use('/productos',productRouter)
module.exports=router