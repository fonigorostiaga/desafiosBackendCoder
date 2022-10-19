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
        const data=await fs.promises.readFile(this.archivo, "utf-8")
        const jsonData=JSON.parse(data)
        const newArray=jsonData.filter(item=>item.id!=id)
        for(let i=0;i<newArray.length;i++){
            newArray[i]={...newArray[i],id:(i+1)}
        }
            await fs.promises.writeFile(this.archivo,JSON.stringify(newArray, null, 2))
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
}}

module.exports=Contenedor

