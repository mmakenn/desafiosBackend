import { emitChat } from "../api/chat.js"
import { emitProducts } from "../api/products.js"

export function setApi(io, req) {
    io.on('connection', socket => {
        console.log("Conexion con el cliente establecida.")
        emitProducts(socket, io, req)
        emitChat(socket, io, req)
    })
}