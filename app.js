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

const {schema, normalize, denormalize}=require('normalizr')
const util=require('util')




const productosDB=require('./database/products/claseDB')
const mongoConnect=require('./database/mongoDB/mongo.config')
const serviceMongo=require('./src/services/mongoServices')
const { setTimeout } = require('timers')
mongoConnect()

const secretito=process.env.COOKIE_SECRET
const mongoConfig={
    useNewUrlParser:true,
    useUnifiedTopology:true
}
const storeConfig={
    mongoUrl:'mongodb+srv://fonigorostiaga:Jazmin2020@rupertocluster.eo6y36x.mongodb.net/session?retryWrites=true&w=majority',
    mongoOptions:mongoConfig,
    ttl:120,
    dbName:'ecommerce',
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
app.use('/api',indexRouter)

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


app.set('views','./views')
app.set('view engine', 'ejs')




app.get('/login',async(req,res)=>{
    res.render('login')

})
app.post('/login',async(req,res)=>{
    const {name}=req.body
    req.session.name=name
    res.redirect('/inicio')
})
app.get('/inicio',async(req,res)=>{
    if(req.session.name){
       return res.render('inicio',{name:req.session.name})
    }
    res.render('login')
    
})
app.get('/logout', async(req,res)=>{
    res.render('logout',{name:req.session.name})
    req.session.destroy(err=>{
        if(err){
            return res.status(400).json({
                success:false,
                message:err.message
            })
        }
    });
    
})
module.exports=http;