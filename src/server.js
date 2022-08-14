/* Server */
import express from 'express'

/* Static, JSON, forms, compression. */
import { setMiddleware } from './middleware/middleware.js';
/* Session and Passport for authentication */
import { setSession } from './middleware/session.js'
import { authenticationHandler, sessionHandler} from './middleware/passport.js';
/* Handlebars */
import { setHandlebars } from './middleware/handlebars.js';
/* Routers */
import { routerCart } from './routers/routerCart.js'
import { routerShop } from './routers/routerShop.js'
import { routerUser } from './routers/routerUser.js'
/* Logger */
import logger from './components/logger.js';
import { auth } from './middleware/authUser.js';

export function createServer(port) {
    const app = express()
    
    setMiddleware(app)

    setSession(app)
    
    app.use(authenticationHandler)
    app.use(sessionHandler)

    setHandlebars(app)
    
    app.use(routerUser)
    app.use('/api/carrito', auth, routerCart)
    app.use('/api/productos', auth, routerShop)

    app.get('*', (req, res) => {
        logger.warn(`Request to URL: ${req.url} with method: ${req.method} is not implemented`)
        res.sendStatus(501)
    })
    
    const connectedServer = app.listen(port, () => {
        logger.info(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
    })
    connectedServer.on('error', error => logger.error(`Error en servidor ${error}`))
}