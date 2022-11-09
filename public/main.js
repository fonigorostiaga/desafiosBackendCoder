const socket=io()

let messages=[];

let productos=[]
const updateMessages=(data)=>{
    messageToHtml=''
    data.forEach(i=>{
        messageToHtml=messageToHtml+`<li><span class="correo"><b>${i.email}</b></span> <span class="timeStamp">[${i.timeStamp}]</span>: <span class="message">${i.message}</span></li>`
    })
    document.querySelector("#messagesList").innerHTML=messageToHtml
}

  const updateProductos=(data)=>{
    productosToHtml=''
    data.forEach(i=>{
        productosToHtml=productosToHtml+`<tr><td>${i.id}</td><td>${i.title}</td><td>${i.price}</td></tr>`
    });
    document.querySelector(".tableBody").innerHTML=productosToHtml
  }

socket.on('UPDATE_DATA',data=>{
    console.log(data.productos)
    messages=data.messages
    productos=data.productos
    updateProductos(productos)
    updateMessages(messages)
})
const sendNewProduct=()=>{
    const title=document.querySelector("#title").value
    const thumbnail=document.querySelector("#thumbnail").value
    const price=document.querySelector("#price").value
    if(!title||!thumbnail||!price){
        alert("te faltan datos")
        return
    }
    const nuevoProducto={
        title, thumbnail,price
    }
    socket.emit('NEW_PRODUCT_TO_SERVER',nuevoProducto)
    document.querySelector("#title").value=''
    document.querySelector("#thumbnail").value=''
    document.querySelector("#price").value=''

}
socket.on('NEW_PRODUCTS_FROM_SERVER',data=>{
    updateProductos(data)
})


socket.on('UPDATE_MESSAGES',data=>{
    messages=data;
    updateMessages(messages)
})
const sendNewMessage=()=>{

    const timeStamp=new Date().toLocaleString()
    const email=document.querySelector("#userEmail").value
    const message=document.querySelector("#mensaje").value
    if(!email||!message){
        alert("faltan datos")
        return
    }
    const messageObj={
        timeStamp,
        email,
        message
    }
    socket.emit('NEW_MESSAGE_TO_SERVER',messageObj)
    document.querySelector("#mensaje").value=''
    
}
socket.on('NEW_MESSAGE_FROM_SERVER',data=>{
    messages.push(data)
    updateMessages(messages)
})

