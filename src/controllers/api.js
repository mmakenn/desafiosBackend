import { emitChat } from "../components/chat.js"
import { emitProducts } from "../components/products.js"
import logger from "../components/logger.js"

export function setApi(io, req) {
    io.on('connection', socket => {
        logger.info("Conexion con el cliente establecida.")
        emitProducts(socket, io, req)
        emitChat(socket, io, req)
    })
}

export function showProducts(req, res, next) {
    logger.info(`Request to URL: ${req.url} with method: ${req.method}`)
    setApi(io, req)
    res.render('body', {user: req.user.username});
}
