import logger from './logger.js'
import { chat } from '../DAOs/factoryDAO.js';

export function emitChat(socket, io) {
    chat.getAll()
        .then(messages => socket.emit('showChat', messages));

    socket.on('updateChat', message => {
        logger.info("El Servidor recibió un nuevo mensaje.")
        chat.save(message)
            .then(() => {
                chat.getAll()
                    .then(messages => io.sockets.emit('showChat', messages));
            })
        }
    );
}