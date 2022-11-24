const fs=require ("fs")

class Contenedor{
    constructor(archivo){
        this.archivo=archivo
    }
    async save(objeto){
        try{
            const data=await fs.promises.readFile(this.archivo,"utf-8")
            const jsonData=JSON.parse(data)
            const id=jsonData.length+1
            objeto={...objeto, id:id}
            jsonData.push(objeto)
            await fs.promises.writeFile(this.archivo, JSON.stringify(jsonData, null, 2))
            console.log(id)
            
        }catch(error){
            const id=1
            objeto={...objeto, id:id}
            await fs.promises.writeFile(this.archivo, JSON.stringify([objeto], null, 2))
            console.log(id)
        }
    }
    async getByID(id){
        try{
        const data=await fs.promises.readFile(this.archivo,"utf-8")
        const jsonData=JSON.parse(data)
        const elementofiltrado=jsonData.find(item=>item.id==id)
        if(elementofiltrado==undefined){
            return null       
        }else{
            return elementofiltrado
        }}catch(error){
            console.log(error)
        }
    }
    
    async getAll(){
        try{
        const data=await fs.promises.readFile(this.archivo,"utf-8")
        const jsonData=JSON.parse(data)
        return jsonData 
    }catch(error){
        throw new Error(error)
    }
    }
    async deleteById(id){
        try{
            const data=await fs.promises.readFile(this.archivo,"utf-8");
            const jsonData=JSON.parse(data)
            const deleted = jsonData.find(i=>i.id==id)
            const products = jsonData.filter(i=>i.id!=id)
            for(let i=1;i<=products.length;i++){
                products[i-1].id=i
            }
            await fs.promises.writeFile(this.archivo,JSON.stringify(products,null,2))
            return deleted
    
        }catch(error){
            console.log("el elemendo que intentas eliminar no existe")
        }
    }
    async deleteAll(){
        try{
        const arrayVacio=[]
        await fs.promises.writeFile(this.archivo, JSON.stringify(arrayVacio, null, 2))

        }catch(error){
            throw new Error
        }
}
    async putByID(id,obj){
        try {
            const data=await fs.promises.readFile(this.archivo,"utf-8");
            const jsonData=JSON.parse(data)
            const product = jsonData.find(i=>i.id==id)
            const nuevoID=parseInt(id)
            const prodModify = {...product, ...obj,id:nuevoID}
            const products = jsonData.filter(i=>i.id!=id)
            products.push(prodModify)
            await fs.promises.writeFile(this.archivo,JSON.stringify(products,null,2))
            return products
            
        } catch (error) {
            throw new Error

        }
    }

    async getRandom(){
        try {
            const data=await fs.promises.readFile(this.archivo,"utf-8")
            const jsonData=JSON.parse(data);
            let productoRandom=parseInt(Math.random()*(jsonData.length-1))
            return jsonData[productoRandom]
        } catch (error) {
            console.error(error)
        }
    }}




module.exports=Contenedor

