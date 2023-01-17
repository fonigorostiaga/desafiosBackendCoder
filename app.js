const express=require('express')
require('dotenv').config()
const indexRouter=require('./src/routes/index')
const app=express()

const cookieParser=require('cookie-parser')
const session=require('express-session')
const MongoStore=require('connect-mongo')

const {Server:IoServer}=require('socket.io')
const {Server:HttpServer}=require('http')
const http=new HttpServer(app)
const io=new IoServer(http)

const mongoConnect=require('./database/mongoDB/mongo.config')
const serviceMongo=require('./src/services/mongoServices')
mongoConnect()

const secretito=process.env.COOKIE_SECRET
const mongoConfig={
    useNewUrlParser:true,
    useUnifiedTopology:true
}
const storeConfig={
    mongoUrl:'mongodb://localhost:27017/',
    mongoOptions:mongoConfig,
    ttl:60,
    dbName:'desafios',
    stringify:true
}
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(session({
    store:MongoStore.create(storeConfig),
    secret:secretito,
    resave:true,
    saveUninitialized:false

}))
app.use(express.static(__dirname+'/public'))

app.get('/health',(_req,res)=>{
    res.status(200).json({
        health:"up",
        success:true,
        environment:process.env.ENVIRONMENT
    })
})

io.on('connection',async(socket)=>{
    console.info("nuevo cliente conectado")

    socket.on('NEW_MESSAGE_TO_SERVER',async (data)=>{
        await serviceMongo.newMsg(data)
        io.sockets.emit('NEW_MESSAGE_FROM_SERVER',data)
    })

    const mensajes=await serviceMongo.getMsgs()
    
    const productos=await serviceMongo.getAllProds()
    socket.emit('UPDATE_DATA',{productos,mensajes})

    socket.on('NEW_PRODUCT_TO_SERVER',async (data)=>{
        await serviceMongo.newProd(data)
        nuevosProductos=await serviceMongo.getAllProds()
        io.sockets.emit('NEW_PRODUCTS_FROM_SERVER',nuevosProductos)
    })
})


app.set('views','./views')
app.set('view engine', 'ejs')

app.use(indexRouter)





module.exports=http;