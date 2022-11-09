const express=require('express')
require('dotenv').config()
const indexRouter=require('./src/routes/index')
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const fileproductos=require('./pruebaMetodos')

app.set('views', './views')
app.set('view engine', 'ejs')


app.use('/api',indexRouter)

app.get('/',(_req,res)=>{

    res.render('pages/index')
})

app.post('/productos',(req,res)=>{
    const { title, thumbnail, price}=req.body
    fileproductos.save({title, thumbnail, price})
    res.redirect('/')

})

app.get('/productos',async(_req,res)=>{
    const productos=await fileproductos.getAll()
    res.render('pages/verProductos', {productos:productos})
})
app.get('/verProductos',(_req,res)=>{
    res.redirect('/')
})




module.exports=app;