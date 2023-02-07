const http=require('./app')
const cluster=require('cluster')
const numCpus=require('os').cpus().length


const PORT=parseInt(process.argv[2])||3000

if(cluster.isMaster){
    for(let i=0;i<numCpus;i++){
        cluster.fork()
    }
    cluster.on('exit',()=>console.log('process '+process.pid, ' died'))
}else{
    http.listen(PORT,()=>console.log('server running '+process.pid+' in port '+PORT))

}

http.listen(PORT,()=>console.log('server running '+process.pid+' in port '+PORT))

