const knexConfig=require('../config')
const knex=require('knex')(knexConfig)

knex.schema.createTable('lloteprods', table=>{
    table.increments('id').notNullable(),
    table.string('code').notNullable(),
    table.float('price').notNullable(),
    table.string('title').notNullable(),
    table.string('thumbnail').notNullable()
}).then(()=>{
    console.log('table created')
}).catch((error)=>{
    console.error(error)
}).finally(()=>{
    knex.destroy()
})


knex.schema.createTable('mensajes',table=>{
    table.increments('id').notNullable()
    table.string('email').notNullable()
    table.string('message').notNullable()
    table.string('timeStamp').notNullable()
}).then(()=>{
    console.log('table created')
}).catch((error)=>{
    console.error(error)
}).finally(()=>{
    knex.destroy()
})
