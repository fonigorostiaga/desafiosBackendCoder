const knexConfig=require('../config')
const knex=require('knex')(knexConfig)
const {v4:uuidV4}=require('uuid')

class ContenedorDB{
    constructor(){
        this.knex=knex
    }
    async createProd(obj){
        const producto={...obj,code:uuidV4()}
        await this.knex('lloteprods').insert(producto).then(()=>{
            console.log('product added')
        }).catch(error=>{
            console.log(error)
        }).finally(()=>{
            // this.knex.destroy()
        })

        // return new Promise((res,rej)=>{
        //     this.knex('lloteprods').insert(producto).then(()=>{
        //         res({
        //             success:true,
        //             data:producto
        //         }).catch(err=>{
        //             rej(err)
        //         }).finally(()=>{
        //             // this.knex.destroy()
        //         })
        //     })
        // })
    }
    async getProdByCode(code){
        return new Promise((res,rej)=>{
            this.knex('lloteprods').where('code','=',code).select('*').then((data)=>{
                res(data)
            }).catch(err=>{
                rej(err)
            }).finally(()=>{
                this.knex.destroy()
            })
            })
        }
        async getAll(){
            return new Promise((res,rej)=>{
                this.knex('lloteprods').select('*').then(data=>{
                    res(data)
                }).catch(error=>{
                    rej(error)
                }).finally(()=>{
                    // this.knex.destroy()
                })
            })
        }
        async modifyProd(code, obj){
            // modifiedProd=this.knex('lloteprods').where('code','=',code).select('*')
            return new Promise ((res,rej)=>{
                this.knex('lloteprods').where('code','=',code).update({
                    price:obj.price, 
                    title:obj.title, 
                    thumbnail:obj.thumbnail,
                    code:code
                }).then(data=>{
                    res(data)
                }).catch(error=>{
                    rej(error)
                }).finally(()=>{
                    this.knex.destroy()
                })
            })
        }
        async deleteByCode(code){
            return new Promise((res,rej)=>{
                this.knex('lloteprods').where('code','=',code).del('*').then(data=>{
                    res(data)
                }).catch(error=>{
                    rej(error)
                }).finally(()=>{
                    this.knex.destroy()
                })
            })
        }
}

const productosDB=new ContenedorDB()


module.exports=productosDB