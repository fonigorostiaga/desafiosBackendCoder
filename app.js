const express=require('express')
require('dotenv').config()
const indexRouter=require('./src/routes/index')
const app=express()

const  passport =require('passport')
const md5 = require('md5')
const LocalStrategy=require('passport-local').Strategy

const cookieParser=require('cookie-parser')
const session=require('express-session')
const MongoStore=require('connect-mongo')

const {Server:IoServer}=require('socket.io')
const {Server:HttpServer}=require('http')
const http=new HttpServer(app)
const io=new IoServer(http)

const mongoConnect=require('./database/mongoDB/mongo.config')
const serviceMongo=require('./src/services/mongoServices')
const userModel = require('./database/mongoDB/models/userModel')
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

passport.use('login',new LocalStrategy({passReqToCallback:true},async(req,username, password, done)=>{
    const userData=await userModel.findOne({username,password:md5(password)})
    if(!userData){
        req.session.errorMess='Las credenciales ingresadas no son validas'
        return done(null, false)
    }
    done(null, userData)
}))
passport.use('signup', new LocalStrategy({passReqToCallback:true},async(req,username, password, done)=>{
    const userData=await userModel.findOne({username})
    if(userData){
        req.session.errorMess='Las credenciales ingresadas no son validas'
        return done(null, false)
    }
    const stageUser=new userModel({
        username,
        password:md5(password),
        email:req.body.email
    })
    const newUser=await stageUser.save()
    done(null, newUser)
}))
passport.serializeUser((user,done)=>{
    done(null, user._id)
})
passport.deserializeUser(async(id,done)=>{
    const userData=await userModel.findById(id)
    done(null, userData)
})

app.use(passport.initialize())
app.use(passport.session())

app.use(indexRouter)





module.exports=http;