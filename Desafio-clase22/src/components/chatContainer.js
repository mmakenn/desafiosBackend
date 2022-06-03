import mongoose from "mongoose";
import { mongoDB } from './database/options.js';
mongoose.connect(mongoDB.urlServer, mongoDB.options);

/* Normalizacion de los mensajes para ser almacenados en la base de datos. */
import { normalize, schema, denormalize } from "normalizr";
const messageSchemaEntity = new schema.Entity('message');
const authorsSchemaEntity = new schema.Entity('authors')
const chatSchemaEntity = new schema.Entity('chat', { 
    authors: authorsSchemaEntity,
    messages: [messageSchemaEntity]
});

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

class ChatContainer {
    constructor(){
        this.collection = mongoose.model("chat", chatSchema);
    }

    async getAll() {
        const all = await this.collection.find({});
        return all;
    }

    async save(message) {
        try {
            const fromServer = await this.getAll();
            let normalizedMsg;
            if (fromServer.length == 0){
                normalizedMsg = normalize(message, chatSchemaEntity);
                console.log('## - NEW normalizedMsg:');
                print(normalizedMsg);
            } else {
                const fromServerDesnormalized = denormalize(fromServer[0].result, chatSchemaEntity, fromServer[0].entities);
                console.log('## - fromServerDesnormalized:');
                console.log(fromServerDesnormalized);
            }
            await this.collection.create(normalizedMsg);
            /* console.log('Message saved');
             */
        }
        catch(err) {
            console.error(err);
        }
    }

    async close(){
        await mongoose.disconnect();
    }
}

export { ChatContainer };