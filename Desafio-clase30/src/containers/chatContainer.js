import mongoose from "mongoose";
import { ContainerMongo } from "./containerMongo.js";

/* Normalizacion de los mensajes para ser almacenados en la base de datos. */
import { normalize, schema, denormalize } from "normalizr";
const authorSchemaEntity = new schema.Entity('author');
const messageSchemaEntity = new schema.Entity('message', {author: authorSchemaEntity});
const chatSchemaEntity = new schema.Entity('chat', {chat: [messageSchemaEntity]});

import util from "util";
function print(objeto) {
  console.log(util.inspect(objeto, false, 12, true))
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
                console.log('## - fromServerDesnormalized:');
                console.log(chatJSONtoNormalize);
                message.id = idToThis;
                chatJSONtoNormalize.id = idToThis;
                chatJSONtoNormalize.chat.push(message);
                console.log('## - We add one:');
                console.log(chatJSONtoNormalize);
            } else {
                message.id = '1';
                chatJSONtoNormalize = {id: '1', chat: [message]};
            } 
            const normalizedMsg = normalize(chatJSONtoNormalize, chatSchemaEntity);
            console.log('## - NEW normalizedMsg:');
            print(normalizedMsg);
            await this.collection.create(normalizedMsg);
            console.log('Message saved');
        }
        catch(err) {
            console.error(err);
        }
    }
}

export { ChatContainer };