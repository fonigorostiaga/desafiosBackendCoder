const {schema, normalize, denormalize}=require('normalizr')
const util=require('util')

const chat={
    id:'mensajes',
    mensajes:[
        {
            author:{
                alias:'foni',
                nombre:'alfonso',
                apellido:'gorostiaga',
                edad:33,
                id:'foni.gorostiaga@gmail.com',
                url:'foni.gorostiaga.png'
            },
            text:'este mensaje es para mongo',
            id:"365b5caf-474f-4f91-95a8-e7ba867f9f35"
        },
        {
            author:{
                alias:'Florr',
                nombre:'Florencia',
                apellido:'victorero',
                edad:31,
                id:'mfvictorero@gmail.com',
                url:'foni.gorostiaga.png'
            },
            text:'este es un mensaje de flori para mongo',
            id:"6bb7f476-96ed-49dc-b492-fb979e97f93b"

        },
        {
            author:{
                alias:'lio',
                nombre:'Lionel',
                apellido:'messi',
                edad:35,
                id:'Liomessi@gmail.com',
                url:'foni.gorostiaga.png'
            },
            text:'este es un mensaje de Messi para mongo',
            id:'6bb7f476-96ed-49dc-45678-fb979e97f93b'
        }
    ]
}


const authorSchema=new schema.Entity('author')
const mensajeSchema=new schema.Entity('mensaje',{
    author:authorSchema
})
const chatSchema=new schema.Entity('mensajes',{
    mensajes:[mensajeSchema]
})
const normData=normalize(chat,chatSchema)

console.log(util.inspect(normData,false,12,true))