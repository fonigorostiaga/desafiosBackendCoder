const http=require('./app')
const PORT=process.env.PORT




http.listen(PORT,()=>{
    console.info("server runing in port "+ PORT)
})
