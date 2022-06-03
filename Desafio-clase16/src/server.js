import express from 'express';
import Handlebars from 'express-handlebars';
import { Server as HttpServer } from 'http';
import { Server as Socket } from 'socket.io';

import { ChatContainer } from './components/chatContainer.js';
import { sqlite3DB as chatDB } from './components/sqlOptions.js';
import { ProductsContainer } from './components/productsContainer.js';
import { mariaDB as productsDB } from './components/sqlOptions.js';

const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

const products = new ProductsContainer("products1", productsDB);
products.newTable();
const chat = new ChatContainer("chat1", chatDB);
chat.newTable();

//--------------------------------------------
// agrego middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//--------------------------------------------
// agrego Handlebars
const handlebarsConfig = {
    extname: '.hbs',
    defaultLayout: 'index.hbs'
}

app.engine('.hbs', Handlebars.engine(handlebarsConfig));
app.set('view engine', '.hbs');
app.set('views', './src/views')

//--------------------------------------------
// configuro el socket
io.on('connection', socket => {
    console.log("Conexion con el cliente establecida.");

    products.getAll()
        .then(products => socket.emit('showProducts', products));

    socket.on('update', product => {
        console.log("El Servidor recibió un nuevo producto.")
        products.save(product)
            .then(() => {
                products.getAll()
                    .then(products => io.sockets.emit('showProducts', products));
            })
        }
    );
    
    /* ------- Chat ------- */
    chat.getAll()
        .then(messages => socket.emit('showChat', messages));

    socket.on('updateChat', message => {
        console.log("El Servidor recibió un nuevo mensaje.")
        chat.save(message)
            .then(() => {
                chat.getAll()
                    .then(messages => io.sockets.emit('showChat', messages));
            })
        }
    );
});

//--------------------------------------------
// inicio el servidor
const PORT = 8080;
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`);
});
connectedServer.on('error', error => console.log(`Error en servidor ${error}`));
