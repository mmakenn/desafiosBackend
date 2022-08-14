import mongoose from "mongoose";
import { ContainerMongo } from "../../datasource/containerMongo.js";
import logger from "../../components/logger.js";

/* Normalizacion de los mensajes para ser almacenados en la base de datos. */
import { normalize, schema, denormalize } from "normalizr";
const authorSchemaEntity = new schema.Entity('author');
const messageSchemaEntity = new schema.Entity('message', {author: authorSchemaEntity});
const chatSchemaEntity = new schema.Entity('chat', {chat: [messageSchemaEntity]});

import util from "util";
function print(objeto) {
  logger.info(util.inspect(objeto, false, 12, true))
}


const chatSchema = new mongoose.Schema(
    {
        entities: { type: Object, required: true }, 
        result: { type: String, required: true }
    }
);

class ChatContainer extends ContainerMongo {
    constructor(){
        super("chat", chatSchema);
    }

    async save(message) {
        try {
            const fromServer = await this.getAll();
            let chatJSONtoNormalize;
            if (fromServer.length != 0) {
                await this.collection.deleteOne();
                
                chatJSONtoNormalize = denormalize(fromServer[0].result, chatSchemaEntity, fromServer[0].entities);
                const idToThis = String(parseInt(fromServer[0].result) + 1);
                logger.info('## - fromServerDesnormalized:');
                logger.info(chatJSONtoNormalize);
                message.id = idToThis;
                chatJSONtoNormalize.id = idToThis;
                chatJSONtoNormalize.chat.push(message);
                logger.info('## - We add one:');
                logger.info(chatJSONtoNormalize);
            } else {
                message.id = '1';
                chatJSONtoNormalize = {id: '1', chat: [message]};
            } 
            const normalizedMsg = normalize(chatJSONtoNormalize, chatSchemaEntity);
            logger.info('## - NEW normalizedMsg:');
            print(normalizedMsg);
            await this.collection.create(normalizedMsg);
            logger.info('Message saved');
        }
        catch(err) {
            logger.error(`Error, object ${object} not saved:
                Database error:
                \t ${err}`)
        }
    }
}

export { ChatContainer };