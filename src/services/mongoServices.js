const mongoose=require('mongoose')
const messageModel=require('../../database/mongoDB/models/messageModel')
const productModel=require('../../database/mongoDB/models/productModel')
const {v4:uuidV4}=require('uuid')
const {schema, normalize, denormalize}=require('normalizr')
const util=require('util')


class mongoService{
    constructor(){}

    async newMsg(data){
        const message={...data,id:uuidV4()}
        const newMsj=new messageModel(message)
        return await newMsj.save()
        
    }

    async getMsgs(){
        const msjs=await messageModel.find({},{_id:false,__v:false})
        return msjs
}
    async newProd(data){
        const product={...data,id:uuidV4()}
        const newProd=new productModel(product)
        return await newProd.save()
    }
    async getAllProds(){
        const prods=await productModel.find({},{_id:false,__v:false})
        return prods
    }
    async getProdById(id){
        const prod=await productModel.find({id:id})
        return prod
    }
    async updateProd(id,prod){
        const prodMod=await productModel.updateOne({id:id},{$set:prod})
        return prodMod
    }
    async deleteProd(id){
        const deletedProd=await productModel.deleteOne({id:id})
        return deletedProd
    }
}
const serviceMongo=new mongoService()
module.exports=serviceMongo