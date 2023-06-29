const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.products = [];
        this.loadProducts();
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            if (data) {
                this.products = JSON.parse(data);
            }
        } catch (err) {
            return []
            //console.error('Error loading products:', err);
        }
    }

    saveProducts() {
        try {
            fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
        } catch (err) {
            console.error('Error saving products:', err);
        }
    }

    generateCode() {
        return this.products.length > 0
            ? Math.max(...this.products.map((product) => product.code)) + 1
            : 1;
    }

    addProduct(product) {
        if (!product.title || product.title == "" || !product.description || product.description == "" || !product.price || product.price == 0 || !product.thumbnail || product.thumbnail == ""  || !product.stock) {
            console.error('All fields are required');
            return;
        }

        const existingProduct = this.products.find((p) => p.code === product.code);
        if (existingProduct) {
            console.error('Product with the same code already exists');
            return;
        }

        const newProduct = {
          
            title: product.title,
            description: product.description,
            price: product.price,
            thumbnail: product.thumbnail,
            code: this.generateCode(),
            stock: product.stock,
        };

        this.products.push(newProduct);
        this.saveProducts();
    }

    getProducts() {
        return this.products;
    }

    getProductById(code) {
        const product = this.products.find((p) => p.code === code);
        if (!product) {
            console.error('Not found');
            return;
        }
        return product;
    }

    updateProduct(code, updatedFields) {
        const productIndex = this.products.findIndex((p) => p.code === code);
        if (productIndex === -1) {
            console.error('Not found');
            return;
        } else {
            console.log("Producto para update encontrado!");
        }

        const updatedProduct = { ...this.products[productIndex], ...updatedFields };
        this.products[productIndex] = updatedProduct;
        this.saveProducts();
    }

    deleteProduct(code) {
        const productIndex = this.products.findIndex((p) => p.code === code);
        if (productIndex === -1) {
            console.error('Not found');
            return;
        }

        this.products.splice(productIndex, 1);
        this.saveProducts();
    }
}



const bruno = new ProductManager('products.json');

console.log("Productos cargados: ",bruno.getProducts());

const product1 = {
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    stock: 25,
};
bruno.addProduct(product1);

const product2 = {
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    stock: 25,
};
bruno.addProduct(product2);

console.log("Productos cargados: ",bruno.getProducts());

const productCode = 1;
const foundProduct = bruno.getProductById(productCode);
console.log("Producto por code: ",foundProduct);

const updatedFields = { price: 250 };
bruno.updateProduct(productCode, updatedFields);

bruno.deleteProduct(productCode);
console.log("Productos cargados: ",bruno.getProducts());

