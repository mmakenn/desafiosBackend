import logger from './logger.js'
import { productsList as products } from '../DAOs/factoryDAO.js';

export function emitProducts(socket, io) {
    products.getAll()
        .then(products => socket.emit('showProducts', products));

    socket.on('update', product => {
        logger.info("El Servidor recibió un nuevo producto.")
        products.save(product)
            .then(() => {
                products.getAll()
                    .then(products => io.sockets.emit('showProducts', products));
            })
        }
        );
}