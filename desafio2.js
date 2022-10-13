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
            await fs.promises.writeFile(this.archivo, JSON.stringify(jsonData,null, 2))
            return
        }catch(error){
throw new Error(error)        }
    }
    async getByID(id){
        try{
        const data=await fs.promises.readFile(this.archivo,"utf-8")
        const jsonData=JSON.parse(data)
        // console.log(jsonData)
        const elementofiltrado=jsonData.find(item=>item.id==id)
        if(elementofiltrado==undefined){
            return null       
        }else{
            return elementofiltrado
        }}catch(error){
            throw new Error(error)
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
        const elementoFiltrado=jsonData.filter(item=>item.id==id)
        if(elementoFiltrado==undefined){
            console.error("no se encuentra el elemento")
        }else{
            const newArray=jsonData.filter(item=>item.id!=id)
            for(let i=0;i<newArray.length;i++){
                newArray[i]={...newArray[i],id:(i+1)}

            }
            await fs.promises.writeFile(this.archivo,JSON.stringify(newArray, null, 2))

        }}catch(error){
            throw new Error(error)
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

    

const persona =new Contenedor("./productos.txt")
persona.save({title:"producto1", price:1500, url:"imagenproducto1.png"})


