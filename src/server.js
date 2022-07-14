/* Initialize */
import express from 'express'
import { Server as HttpServer } from 'http'
import { Server as Socket } from 'socket.io'
/* Static, JSON, forms. */
import { setMiddleware } from './components/middleware.js';
/* Session and Passport for authentication */
import { setPassport } from './components/passport.js';
import { auth } from './components/authUser.js'
/* Handlebars */
import { setHandlebars } from './components/handlebars.js';
/* Routers */
import { sessionRouter } from './router/sessionUser.js'
import { infoRouter } from './router/info.js'
import { randomRouter } from './router/randoms.js'
import { testingRouter } from "./router/testProducts.js"
/* Websockets connection functions */
import { setApi } from './router/api.js';

export function createServer(port) {
    const app = express()
    const httpServer = new HttpServer(app)
    const io = new Socket(httpServer)
    
    setMiddleware(app)
    
    setPassport(app)

    setHandlebars(app)
    
    
    app.use(sessionRouter)
    app.use(infoRouter)
    app.use(randomRouter)
    app.use(testingRouter)

    app.get('/api/productos', auth, (req, res, next) => {
        setApi(io, req)
        res.render('body', {user: req.user.username});
    })
    
    const connectedServer = httpServer.listen(port, () => {
        console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
    })
    connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
}