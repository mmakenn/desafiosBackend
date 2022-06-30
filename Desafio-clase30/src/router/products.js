import { ProductsContainer } from '../components/productsContainer.js';
import { mariaDB as productsDB } from '../../options.js';
const products = new ProductsContainer("products1", productsDB);
products.newTable();

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