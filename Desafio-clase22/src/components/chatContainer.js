import mongoose from "mongoose";
import { mongoDB } from './database/options.js';
mongoose.connect(mongoDB.urlServer, mongoDB.options);

/* Normalizacion de los mensajes para ser almacenados en la base de datos. */
import { normalize, schema, denormalize } from "normalizr";
const messageSchemaEntity = new schema.Entity('message');
const authorsSchemaEntity = new schema.Entity('authors', {messages: [messageSchemaEntity]});

import util from "util";
function print(objeto) {
  console.log(util.inspect(objeto, false, 12, true))
}


const chatSchema = new mongoose.Schema(
    {
        entities: Object, 
        result: String
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
            const saved = await this.getAll();
            let normalizedMsg;
            if (saved == []){
                normalizedMsg = normalize(message, authorsSchemaEntity);
                print(normalizedMsg);
            } else {
                const savedDesnormalized = denormalize(saved.result, authorsSchemaEntity, saved.entities);
                console.log(savedDesnormalized);
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