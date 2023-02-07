const express=require('express')
const productRouter=require('./productos/productos.router')
const router=express.Router()
const productTestRouter=require('./productos/productos-test.router')
const sessionRouter=require('./sessions.routes/session.routes')
const randomRouter=require('./apiRandomNumbers/apiRandom.router')
router.get('/health',(_req,res)=>{
    res.status(200).json({
        success:true,
        health:'up',
        environment:process.env.ENVIRONMENT
    })
})

.use('/productos',productRouter)
.use('/productos-test',productTestRouter)
.use(sessionRouter)
.use('/api',randomRouter)
module.exports=router