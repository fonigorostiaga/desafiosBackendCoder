const express=require('express')
const router=express.Router()
const _=require('loadsh')
const serviceMongo=require('../../services/mongoServices')

router.get('/',async(_req,res)=>{
    try {
        const arrayProductos= await serviceMongo.getAllProds()
        res.status(200).send(arrayProductos)
    } catch (error) {
        console.log(error)
    }

})



router.get('/:id',async(req,res)=>{
    const {id}=req.params
    try {
        const selected=await serviceMongo.getProdById(id)
        if(selected){
        res.status(200).json(selected)}
        else{
            res.status(500).json({
                error:"no encontrado"
            })        }
    } catch (error) {
        res.status(500).json({
            error:"no encontrado"
        })
    }
})



router.post('/', async(req,res)=>{
    try {
        const {body}=req
        await serviceMongo.newProd(body)
        const productos=await serviceMongo.getAllProds()
        const productoAgregado=productos[(productos.length)-1]
        res.status(200).json(productoAgregado)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.put('/:id',async(req,res)=>{
    const {id}=req.params
    const {body}=req
    try {
        let prodModify = await serviceMongo.updateProd(id,body)
        res.status(200).json(prodModify)
        
    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete('/:id', async(req,res)=>{
    const {id}=req.params;

    try {
        let deleted = await serviceMongo.deleteProd(id);
        if (deleted) {
        res.status(200).json({
            deleted: deleted
        })
        } else {
            res.status(404).json({
            error:"no encontrado"
            })
        }
    } catch (error) {
        res.status(500).json(error)

    }
})


module.exports=router
