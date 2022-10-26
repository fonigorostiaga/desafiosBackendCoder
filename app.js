const express=require('express')
require('dotenv').config()
const indexRouter=require('./src/routes/index')
const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/public',express.static(__dirname+"/public"))

app.use('/api',indexRouter)
module.exports=app;