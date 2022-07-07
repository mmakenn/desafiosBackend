import { ProductsContainer } from '../containers/productsContainer.js';

const products = new ProductsContainer()

export function emitProducts(socket, io) {
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
}