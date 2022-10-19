const fs=require('fs')
const express=require('express')
const app=express()
require('dotenv').config()
const Contenedor=require('./desafio2')
const fileproductos=require('./pruebaMetodos')


app.get('/productos',async(_req,res)=>{
    try {
        const arrayProductos= await fileproductos.getAll()
        res.status(200).send(arrayProductos)
    } catch (error) {
        console.log(error)
    }


})

app.get('/randomproducts', async(_req,res)=>{
    try {
        const arrayProductos=await fileproductos.getAll()
        const id=parseInt(Math.random()* arrayProductos.length)
        const productoRandom=await fileproductos.getByID(id||1)
        console.log(id)
        res.status(200).json(productoRandom)
    } catch (error) {
        console.log(error)
    }
})

const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.info("server runing in port "+ PORT)
})
