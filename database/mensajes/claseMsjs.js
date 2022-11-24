const knexConfig=require('../config')
const knex=require('knex')(knexConfig)


class Mensajes{
    constructor(){
        this.knex=knex
    }
    async newMessage(obj){
        await this.knex('mensajes').insert(obj).then(()=>{
            console.log("nuevo mensaje a base de datos")
        }).catch(error=>{
            console.log(error)
        }).finally(()=>{
            this.knex.destroy()
        })
    }
    async getMsgs(){
        const messages=await this.knex('mensajes').select('*').then(()=>{
            console.log("mensajes cargados")
        }).catch(error=>{
            console.log(error)
        }).finally(()=>{
            // this.knex.destroy()
        });
        return messages
    }
}
const mensajes=new Mensajes()

module.exports=mensajes