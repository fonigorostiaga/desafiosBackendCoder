const fs=require('fs')
const app=require('./app')
const fileproductos=require('./pruebaMetodos')
const PORT=process.env.PORT




app.listen(PORT,()=>{
    console.info("server runing in port "+ PORT)
})
