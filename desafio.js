class productManager{

    constructor(){
        this.producto=[];
    }
    addProductos(title,description,price,thumbnail,stock){
        let nCode;
        if(!this.producto.length){
            nCode=1;
        } else {
            nCode = this.producto[this.producto.length-1].code+1
        };
        const nProducto = {
            code:nCode,
            title,
            description,
            price,
            thumbnail,
            stock,
        };
        this.producto.push(nProducto);
        console.log("nuevo producto creado");
    };
    getProducts(){
        return this.producto;
    };

    getElementById(codeProducto){
        //evaluar que el evento exista.
        const productoE = this.producto.some((producto)=>{return producto.code === codeProducto});
        if(!productoE){
            console.log("Producto no existente")
        } else {
            console.log("Producto existente")

        }
    }



}

const bruno = new productManager();

console.log("Productos: ",bruno.getProducts());

console.log("------------------------------------")

bruno.addProductos("Playstatio","maquina para jugar videojuegos",170000,"sin imagen",5)

console.log("------------------------------------")

bruno.addProductos("telefono","dispositivo para comunicarse",65000,"sin imagen",10)


console.log("------------------------------------")


bruno.getElementById(1);

console.log("------------------------------------")


console.log("Productos: ",bruno.getProducts());


