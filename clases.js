class Usuario{
    constructor(){
        this.nombre="Alfonso", 
        this.apellido="gorostiaga",
        this.libros=[{nombre:"Harry potter y la piedra filosofal", autor:"J.K. Rowling"}, {nombre:"El codigo Da Vinci", autor:"Dan Brown"}, {nombre:"El señor de los anillos y el retorno del rey", autor:"Tolkien"}]
        this.mascotas=["tostado", "coco", "datolo", "mouche"]
    }
    getFullName(){
        let fullName=`${this.nombre} ${this.apellido}`
        return fullName
    }
    addMascota(nombre){
        this.mascotas.push(nombre)
    }
    countMascotas(){
        return this.mascotas.length
    }
    addBook(libro, autor){
        this.libros.push({
            nombre:libro,
            autor:autor
        })
    }
    getBooksNames(){
        let booksNames=[]
        for(let book of this.libros){
            booksNames.push(book.nombre)
            
        }
        return booksNames
    }
}
const persona=new Usuario

console.log(persona.getFullName())
persona.addMascota("Riquelme")
console.log(persona.countMascotas())
persona.addBook("Juego de Tronos", "George Martin");
console.log(persona.getBooksNames())

