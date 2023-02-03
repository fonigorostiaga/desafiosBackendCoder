const {fork}=require('child_process')

const getRandomObject=(cant)=>{
    let obj={}
    for(i=0;i<cant;i++){
        let x=Math.floor(Math.random()*5)
        if(obj[x]){
            obj[x]=obj[x]+1
        }else{
            obj[x]=1
        }
    }
    return obj
}

process.on('message',(cant)=>{
    const obj=getRandomObject(cant)
    process.send(obj)
})