const socket=io()

let productos=[]


  const updateProductos=(data)=>{
    productosToHtml=''
    data.forEach(i=>{
        productosToHtml=productosToHtml+`<tr><td>${i.id}</td><td>${i.title}</td><td>${i.price}</td></tr>`
    });
    document.querySelector(".tableBody").innerHTML=productosToHtml
  }

socket.on('UPDATE_DATA',data=>{
    console.log(data)
    productos=data
    updateProductos(productos)
})