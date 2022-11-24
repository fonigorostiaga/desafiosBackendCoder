const express=require('express')
const router=express.Router()
const _=require('loadsh')
const productosDB=require('../../../database/products/claseDB')

router.get('/hola',(_req,res)=>{
    res.status(200).json({
        success:true,
        message:"hola mundo"
    })
})
router.post('/',async(req,res)=>{
    const {body}=req
    if(_.isNil(body)){
        return res.status(400).json({
            success:false,
            message:"bad request"
        })
    }
    try {
        const data=await productosDB.createProd(body)
        if(data.success){
            return res.status(200).json(data)
        }
        res.status(400).json(data)
    } catch (error) {
        
    }
})

router.get('/:code',async(req,res)=>{
    const {code}=req.params
    try {
        const data=await productosDB.getProdByCode(code)
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
})
router.get('/',async(_req,res)=>{
    try {
        const data=await productosDB.getAll()
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
})
router.put('/:code/:title/:thumbnail/:price', async(req,res)=>{
    const {code, title, thumbnail, price}=req.params
    const obj={code, title, thumbnail, price}
    try {
        await productosDB.modifyProd(code,obj)
        res.status(200).json({
            success:true,
            newProd:obj
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
})

router.delete('/:code',async(req,res)=>{
    const {code}=req.params;
    try {
        const data=await productosDB.deleteByCode(code)
        res.status(200).json({
            status:true,
            deleted:data
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
})
module.exports=router