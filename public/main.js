const socket=io()



let messages=[];

let productos=[]
const updateMessages=(data)=>{
    messageToHtml=''
    console.log(data)
    data.forEach(i=>{
        messageToHtml=messageToHtml+`<li><span class="correo"><b>${i.author.alias}</b>: <span class="message">${i.text}</span></li>`
    })
    document.querySelector("#messagesList").innerHTML=messageToHtml
}

  const updateProductos=(data)=>{
    productosToHtml=''
    data.forEach(i=>{
        productosToHtml=productosToHtml+`<tr><td>${i.title}</td><td>${i.code}</td><td>${i.price}</td></tr>`
    });
    document.querySelector(".tableBody").innerHTML=productosToHtml
  }

socket.on('UPDATE_DATA',data=>{
    console.log(data.productos)
    messages=data.mensajes
    productos=data.productos
    updateProductos(productos)
    updateMessages(messages)
})
const sendNewProduct=()=>{
    const title=document.querySelector("#title").value
    const thumbnail=document.querySelector("#thumbnail").value
    const price=document.querySelector("#price").value
    const code=document.querySelector("#code").value
    if(!title||!thumbnail||!price||!code){
        alert("te faltan datos")
        return
    }
    const nuevoProducto={
        title, thumbnail,price,code
    }
    socket.emit('NEW_PRODUCT_TO_SERVER',nuevoProducto)
    document.querySelector("#title").value=''
    document.querySelector("#thumbnail").value=''
    document.querySelector("#price").value=''
    document.querySelector("#code").value=''

}
socket.on('NEW_PRODUCTS_FROM_SERVER',data=>{
    updateProductos(data)
})


socket.on('UPDATE_MESSAGES',data=>{
    messages=data;
    updateMessages(messages)
})
const sendNewMessage=()=>{

    const id=document.querySelector("#email").value;
    const nombre=document.querySelector('#name').value
    const apellido=document.querySelector('#lastname').value
    const edad=document.querySelector('#age').value
    const alias=document.querySelector('#alias').value
    const avatar=document.querySelector('#avatar').value
    const text=document.querySelector("#mensaje").value
    if(!id||!nombre||!apellido||!edad||!alias||!avatar||!text){
        alert("faltan datos")
        return
    }
    const messageObj={
        author:{
            id, 
            nombre, 
            apellido, 
            edad, 
            alias, 
            avatar
        },
        text
    }
    socket.emit('NEW_MESSAGE_TO_SERVER',messageObj)
    document.querySelector("#mensaje").value=''
    
}
socket.on('NEW_MESSAGE_FROM_SERVER',data=>{
    messages.push(data)
    updateMessages(messages)
})

