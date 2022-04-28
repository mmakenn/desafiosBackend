const express = require('express');
const { Contenedor } = require('./contenedor');
const router = require('./routers/routerProductos');
const handlebars = require('express-handlebars');

const { Server: HttpServer } = require('http');
const { Server: Socket } = require('socket.io');

const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

const products = new Contenedor();

//--------------------------------------------
// configuro el socket
io.on('connection', socket => {
    console.log("Conexion con el cliente establecida.");

    socket.emit('showProducts', products.getAll());
    
    socket.on('update', product => {
        console.log("El Servidor recibió un nuevo producto.")
        products.save(product);
        io.sockets.emit('showProducts', products.getAll());
    });
});

//--------------------------------------------
// configuro el router
app.use('/api/productos', router);

//--------------------------------------------
// agrego Handlebars
const handlebarsConfig = {
    extname: '.hdb',
    defaultLayout: 'index.hdb'
}
  
app.engine('.hdb', handlebars.engine(handlebarsConfig));
app.set('view engine', '.hdb');
app.set('views', './src/views')

//--------------------------------------------
// agrego middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//--------------------------------------------
// inicio el servidor
const PORT = 8080;
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`);
});
connectedServer.on('error', error => console.log(`Error en servidor ${error}`));
