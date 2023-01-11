const {faker}=require('@faker-js/faker')

class MockService{
    constructor(){}
    async generateProds(){
        const prods=[]
        for(let i=0;i<5;i++){
            prods.push({
                nombre:faker.commerce.product(),
                precio:faker.commerce.price(1500,6500,2,'$'),
                imagen:faker.image.image()
            })
        }
        return prods
    }
    
}

module.exports=MockService