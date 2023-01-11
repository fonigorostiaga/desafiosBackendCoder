const express=require('express')
const router=express.Router()
const MockService=require('../../services/mockService')
const mockProds=new MockService()


router.get('/', async (_req,res)=>{

    const prods=await mockProds.generateProds()
    res.status(200).json(prods)

})

module.exports=router