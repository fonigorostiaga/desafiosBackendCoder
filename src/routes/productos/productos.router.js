const express=require('express')
const router=express.Router()
const fileproductos=require('../../../pruebaMetodos')


router.get('/',async(_req,res)=>{
    try {
        const arrayProductos= await fileproductos.getAll()
        res.status(200).send(arrayProductos)
    } catch (error) {
        console.log(error)
    }

})

router.get('/random',async(_req,res)=>{
    try {
        const productoRandom=await fileproductos.getRandom()
        res.status(200).json(productoRandom)
    } catch (error) {
        res.status(500).json({
            error:"error"
        })
    }
})

router.get('/:id',async(req,res)=>{
    const {id}=req.params
    try {
        const selected=await fileproductos.getByID(id)
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
        await fileproductos.save(body)
        const productos=await fileproductos.getAll()
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
        const productosIniciales=await fileproductos.getAll()
        if(id<=productosIniciales.length){
        await fileproductos.putByID(id,body)
        const productos=await fileproductos.getAll()
        res.status(200).json(productos)}
        else{
            res.status(500).json({
                error:"no encontrado"
            })
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete('/:id', async(req,res)=>{
    const {id}=req.params;

    try {
        const productosIniciales=await fileproductos.getAll()
        if(id<=productosIniciales.length){
        await fileproductos.deleteById(id);
        const productos=await fileproductos.getAll()
        res.status(200).json(productos)}
        else{
            res.status(500).json({
                error:"no encontrado"
            })
        }
    } catch (error) {
        res.status(500).json(error)

    }
})
module.exports=router
