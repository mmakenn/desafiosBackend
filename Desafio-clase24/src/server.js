import express from 'express';
import { Server as HttpServer } from 'http';
import { Server as Socket } from 'socket.io';
const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

//--------------------------------------------
// agrego middlewares
import cookieParser from 'cookie-parser';
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/private', express.static('public'))
app.use(cookieParser());

//--------------------------------------------
// LogIn
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { mongoDB } from './components/database/options.js';
app.use(session({
    store: MongoStore.create({
        //En Atlas connect App :  Make sure to change the node version to 2.2.12:
        mongoUrl: mongoDB.urlServer,
        mongoOptions: mongoDB.advancedOptions
    }),
    secret: 'cookieForUserLogin',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 40000
    }
}));

app.get('/login', (req, res) => {
    res.render('logIn', {error: false});
});

const admitedPassword = 'myClass24';
app.post('/login', (req, res) => {
    const { user, password } = req.body;
    if (password === admitedPassword) {
        console.log('Contraseña valida');
        req.session.user = user;
        res.redirect('/private');
    } else {
        res.render('logIn', {error: true});
    }
});

function auth(req, res, next){
    console.log('Requerimiento de autentificación, user:');
    console.log(req.session.user);
    if (!req.session.user){
        res.redirect('/login');
    } else {
        next();
    }
}

app.use('/api/productos', auth, (req, res) => {
    res.redirect('/private')
});

app.get('/logout', (req, res) => {
    const userName = req.session.user;
    req.session.destroy(err => {
        if (!err) {
            res.render('logOut', {user: userName});
            res.sendStatus(200)
        } else {
            res.send({ status: 'Logout ERROR', body: err })
        }
    })
});

//--------------------------------------------
// agrego Handlebars
import Handlebars from 'express-handlebars';
const handlebarsConfig = {
    extname: '.hbs',
    defaultLayout: 'index.hbs'
}

app.engine('.hbs', Handlebars.engine(handlebarsConfig));
app.set('view engine', '.hbs');
app.set('views', './src/views')


//--------------------------------------------
// Test de productos con Faker
import { faker } from '@faker-js/faker';
faker.locale = 'es';
app.get('/api/productos-test', (req, res) => {
    const productsTest = [];
    for (let i = 0; i < 5; i++){
        productsTest.push(
            {
                title: faker.commerce.product(),
                price: faker.commerce.price(),
                thumbnail: faker.image.image(),
                stock: faker.random.numeric()
            }
            )
        }
    res.render('productList', { headers: [{title: "Producto"}, {title: "Precio"}, {title: "Imagen"}, {title: "Stock"}],
    products: productsTest, productsExists: true});
});

//--------------------------------------------
// persistencia de datos del chat y el catalogo
import { ChatContainer } from './components/chatContainer.js';
const chat = new ChatContainer();

import { ProductsContainer } from './components/productsContainer.js';
import { mariaDB as productsDB } from './components/database/options.js';
const products = new ProductsContainer("products1", productsDB);
products.newTable();

//--------------------------------------------
// configuro el socket
io.on('connection', socket => {
    console.log("Conexion con el cliente establecida.");
    
    /* ------- Catalogo ------- */
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