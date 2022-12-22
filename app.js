const express=require('express')
require('dotenv').config()
const indexRouter=require('./src/routes/index')
const app=express()

const {Server:IoServer}=require('socket.io')
const {Server:HttpServer}=require('http')
const http=new HttpServer(app)
const io=new IoServer(http)

const {schema, normalize, denormalize}=require('normalizr')
const util=require('util')


const productosDB=require('./database/products/claseDB')
const mongoConnect=require('./database/mongoDB/mongo.config')
const serviceMongo=require('./src/services/mongoServices')
mongoConnect()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

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

io.on('connection',async(socket)=>{
    console.info("nuevo cliente conectado")

    socket.on('NEW_MESSAGE_TO_SERVER',async (data)=>{
        await serviceMongo.newMsg(data)
        io.sockets.emit('NEW_MESSAGE_FROM_SERVER',data)
    })

    const mensajes=await serviceMongo.getMsgs()
    const chatData={id:'mensajes',mensajes:mensajes}
    const authorSchema=new schema.Entity('author')
    const mensajeSchema=new schema.Entity('mensaje',{
        author:authorSchema
    })
    const chatSchema=new schema.Entity('mensajes',{
        mensajes:[mensajeSchema]
    }) 
    const normData=normalize(chatData,chatSchema)
    const productos=await serviceMongo.getAllProds()
    socket.emit('UPDATE_DATA',{productos,mensajes})

    socket.on('NEW_PRODUCT_TO_SERVER',async (data)=>{
        await serviceMongo.newProd(data)
        nuevosProductos=await serviceMongo.getAllProds()
        io.sockets.emit('NEW_PRODUCTS_FROM_SERVER',nuevosProductos)
    })
})


app.set('views', './views')
app.set('view engine', 'ejs')
app.post('/productos',async (req,res)=>{
    const { title, thumbnail, price}=req.body
    await productosDB.createProd({title, thumbnail,price})
    res.redirect('/')

})

app.get('/productos',async(_req,res)=>{
    const productos=await productosDB.getAll()
    res.render('pages/verProductos', {productos:productos})
})
app.get('/',(_req,res)=>{
    res.redirect('/')
})




module.exports=http;