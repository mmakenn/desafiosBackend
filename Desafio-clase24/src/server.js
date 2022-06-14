/* ============================================================ */
/* ======================== INITIALIZE ======================== */
/* ============================================================ */
import express from 'express';
import { Server as HttpServer } from 'http';
import { Server as Socket } from 'socket.io';

const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

/* ============================================================ */
/* ======================== MIDDLEWARE ======================== */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));

/* ============================================================ */
/* ========================= COOKIES ========================= */
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { mongoDB } from './database/options.js';

app.use(session({
    store: MongoStore.create({
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

/* ============================================================ */
/* ======================== HANDLEBARS ======================== */
import Handlebars from 'express-handlebars';
import { handlebarsConfig } from "./database/options.js"

app.engine('.hbs', Handlebars.engine(handlebarsConfig));
app.set('view engine', '.hbs');
app.set('views', './src/views');

/* ============================================================ */
/* ========================== ROUTER ========================== */
import { sessionRouter } from './router/sessionUser.js';

app.use(sessionRouter);

/* ============================================================ */
/* ======================== WEBSOCKETS ======================== */
import { emitChat } from "./router/chat.js"
import { emitProducts } from "./router/products.js"

io.on('connection', socket => {
    console.log("Conexion con el cliente establecida.");
    emitProducts(socket, io);
    emitChat(socket, io);
});

/* ============================================================ */
/* ========================== FAKER ========================== */
import { testingRouter } from "../src/test/testProducts.js"

app.use(testingRouter);

/* ============================================================ */
/* ======================== RUN SERVER ======================== */
/* ============================================================ */
const PORT = 8080;
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`);
});
connectedServer.on('error', error => console.log(`Error en servidor ${error}`));