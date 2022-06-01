import mongoose from "mongoose";
import { mongoDB } from './database/options.js';

await mongoose.connect(mongoDB.urlServer, mongoDB.options)

const schema = new mongoose.Schema({ 
    author: {
        id: { type: String, required: true }, 
        nombre: { type: String, required: true }, 
        apellido: { type: String, required: true }, 
        edad: { type: Number, required: true }, 
        alias: { type: String },
        avatar: { type: String }
    },
    date: { type: String, required: true },
    text: { type: String, required: true }
});

class ChatContainer {
    constructor(){
        this.collection = mongoose.model("chat", schema);
    }

    async getAll() {
        const all = await this.collection.find({});
        return all;
    }

    async save(message) {
        try {
            const info = await this.collection.create(message);
            console.log('Message saved');
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