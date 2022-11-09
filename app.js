const express=require('express')
require('dotenv').config()
const indexRouter=require('./src/routes/index')
const app=express()
const fs=require('fs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const fileproductos=require('./pruebaMetodos')
const {Server:IoServer}=require('socket.io')
const {Server:HttpServer}=require('http')
const http=new HttpServer(app)
const io=new IoServer(http)



app.use(express.static(__dirname+'/public'))

app.use('/api',indexRouter)
app.get('/health',(_req,res)=>{
    res.status(200).json({
        health:"up",
        success:true,
        environment:process.env.ENVIRONMENT
    })
})

app.get('/',(_req,res)=>{


    res.sendFile('index',{root:__dirname})
})
const messages=[]
io.on('connection',async(socket)=>{
    console.info("nuevo cliente conectado")
    
    socket.on('NEW_MESSAGE_TO_SERVER',data=>{
        messages.push(data)
        io.sockets.emit('NEW_MESSAGE_FROM_SERVER',data)
    })
    const productos=await fileproductos.getAll()
    socket.emit('UPDATE_DATA',{productos,messages})
    socket.on('NEW_PRODUCT_TO_SERVER',async (data)=>{
        console.log(data)
        await fileproductos.save(data)
        nuevosProductos=await fileproductos.getAll()
        io.sockets.emit('NEW_PRODUCTS_FROM_SERVER',nuevosProductos)
    })
})


// app.set('views', './views')
// app.set('view engine', 'ejs')
// app.post('/productos',(req,res)=>{
//     const { title, thumbnail, price}=req.body
//     fileproductos.save({title, thumbnail, price})
//     res.redirect('/')

// })

// app.get('/productos',async(_req,res)=>{
//     const productos=await fileproductos.getAll()
//     res.render('pages/verProductos', {productos:productos})
// })
// app.get('/verProductos',(_req,res)=>{
//     res.redirect('/')
// })




module.exports=http;