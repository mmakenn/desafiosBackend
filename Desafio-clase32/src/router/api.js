import { emitChat } from "../api/chat.js"
import { emitProducts } from "../api/products.js"
import logger from "../components/logger.js"

export function setApi(io, req) {
    io.on('connection', socket => {
        logger.info("Conexion con el cliente establecida.")
        emitProducts(socket, io, req)
        emitChat(socket, io, req)
    })
}