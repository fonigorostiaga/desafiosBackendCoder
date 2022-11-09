const fs=require('fs')
const http=require('./app')
const fileproductos=require('./pruebaMetodos')
const PORT=process.env.PORT




http.listen(PORT,()=>{
    console.info("server runing in port "+ PORT)
})
