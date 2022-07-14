import logger from '../components/logger.js'
import { ChatContainer } from '../containers/chatContainer.js';

const chat = new ChatContainer();

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