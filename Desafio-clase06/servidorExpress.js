const express = require('express');
const { Contenedor } = require('./contenedor');

const app = express();
const PORT = 8080;

const archivoProductos = new Contenedor('./data/prfs.txt');

app.get('/', (req, res) => {
    res.send('Ruta inválida (por ahora...)');
});

app.get('/productos', (req, res) => {
    showProducts(res);
});

app.get('/productoRandom', (req, res) => {
    showOneProduct(res);
});

async function showProducts(res) {
    const productos = await archivoProductos.getAll();
    res.send(productos);
}

async function showOneProduct(res) {
    const producto = await archivoProductos.getById(3);
    res.send(producto);
}

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto: ${server.address().port}`);
});
server.on("error", error => console.log(`Error en servidor: ${error}`));