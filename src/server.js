/* Initialize */
import express from 'express'
import { Server as HttpServer } from 'http'
import { Server as Socket } from 'socket.io'
/* Static, JSON, forms, compression. */
import { setMiddleware } from './components/middleware.js';
/* Session and Passport for authentication */
import { setPassport } from './components/passport.js';
/* Handlebars */
import { setHandlebars } from './components/handlebars.js';
/* Routers */
import { sessionRouter } from './router/sessionUser.js'
import { infoRouter } from './router/info.js'
import { randomRouter } from './router/randoms.js'
import { testingRouter } from "./router/testProducts.js"
import { apiRouter } from './router/api.js';
/* Logger */
import logger from './components/logger.js';

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
    app.use(apiRouter)

    app.get('*', (req, res) => {
        logger.warn(`Request to URL: ${req.url} with method: ${req.method} is not implemented`)
        res.sendStatus(501)
    })
    
    const connectedServer = httpServer.listen(port, () => {
        logger.info(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
    })
    connectedServer.on('error', error => logger.error(`Error en servidor ${error}`))
}