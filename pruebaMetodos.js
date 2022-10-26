
const Contenedor=require("./desafio2")

const fileproductos =new Contenedor("./productos.txt")

const pruebaSave= async ()=>{
    try {
        await fileproductos.save({
            title:"Remera Arya Llote",
            price:1500,
            thumbnail:"remeraArya.png"
        })
        await fileproductos.save({
            title:"Remera LloteStudio",
            price:1500,
            thumbnail:"remerallotestudio.png"
        })
        await fileproductos.save({
            title:"Remera Leonardo Da Llote",
            price:1500,
            thumbnail:"remeraleonardoDaLlote.png"
        })
        await fileproductos.save({
            title:"Remera LloteStudio Azul",
            price:1500,
            thumbnail:"RemeraLloteAzul.png"
        })
        await fileproductos.save({
            title:"Remera Llote and chill",
            price:1500,
            thumbnail:"RemeraLloteAndChill.png"
        })
        await fileproductos.save({
            title:"Sticker Llote Raiden",
            price:250,
            thumbnail:"StickerLloteRaiden.png"
        })
        await fileproductos.save({
            title:"Taza RockanLlote",
            price:700,
            thumbnail:"TazaRockanLlote.png"
        })

    } catch (error) {
        console.log(error)
    }
}

const pruebaGetById=async(id)=>{
    await fileproductos.getByID(id)
}

const pruebaGetAll=async()=>{
    await fileproductos.getAll()
}

const pruebaDeleteById=async(id)=>{
    await fileproductos.deleteById(id)
}

const pruebaDeleteAll=async()=>{
    await fileproductos.deleteAll()
}
module.exports=fileproductos

