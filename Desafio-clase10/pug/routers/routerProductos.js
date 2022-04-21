const { Router } = require('express');
const { Contenedor } = require('../contenedor');

const routerProductos = new Router();
const productos = new Contenedor();

const errorNotFound = {error: "Producto no encontrado."};

routerProductos.get('/', (req, res) => {
    res.render('productList.pug', { headers: ["Producto", "Precio", "Imagen"],
                                    products: productos.getAll()});
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
    res.render('newProduct.pug', { link: '/api/productos/sendNewProductForm' });
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