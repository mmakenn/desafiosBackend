const { Router } = require('express');
const { Contenedor } = require('../contenedor');

const routerProductos = new Router();
const productos = new Contenedor();

const errorNotFound = {error: "Producto no encontrado."};

function checkProductsExists(products){
    return (products.length > 0);
}

routerProductos.get('/', (req, res) => {
    const products = productos.getAll();
    const productsExists = checkProductsExists(products);
    res.render('productList', { headers: [{title: "Producto"}, {title: "Precio"}, {title: "Imagen"}],
                                products: products,
                                productsExists: productsExists });
});

routerProductos.get('/:id', (req, res) => {
    const { params } = req;
    const founded = productos.getById(params.id);
    res.send(founded ? founded : errorNotFound);
});

routerProductos.delete('/:id', (req, res) => {
    const { params } = req;
    const result = productos.deleteById(params.id);
    res.send(result ? {mensaje: `Producto con id: ${params.id} eliminado` } : errorNotFound);
});

routerProductos.post('/', (req, res) => {
    res.render('newProduct', { link: '/api/productos/sendNewProductForm' });
});

routerProductos.post('/sendNewProductForm', (req, res) => {
    const { body } = req;
    const id = productos.save(body);
    res.json({mensaje: `Producto agregado con id: ${id}` });
});

routerProductos.put('/:id', (req, res) => {
    const { body, params } = req;
    const result = productos.update(params.id, body.title, body.price, body.thumbnail);
    res.json(result ? { mensaje: `Producto con id: ${params.id} modificado` } : errorNotFound);
})

module.exports = routerProductos;