const http=require('./app')
const minimist=require('minimist')
// const PORT=process.env.PORT||3000


const data=minimist(process.argv.slice(2))

data.port=data._[0]
if(!data.port){
    PORT=3002;
}else{
    PORT=data.port
}
delete data._


http.listen(PORT,()=>{
    console.info("server runing in port "+ PORT)
})
