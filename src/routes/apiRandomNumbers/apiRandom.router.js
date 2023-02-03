const express=require('express')
const router=express.Router()
const {fork}=require('child_process')


router.get('/random',(req,res)=>{
    const {cant}=req.query
    const cantidad=100000000
    const mess=fork('./src/routes/apiRandomNumbers/randomnumbers')
    if(!cant){
    mess.send(cantidad)
    }else{
        mess.send(cant)
    }

    mess.on('message',(obj)=>{
        res.status(200).json(obj)
    })


})

module.exports=router