import mongoose from "mongoose";
import { ContainerMongo } from "./containerMongo.js";

const usersSchema = new mongoose.Schema(
    {
        username: { type: String, required: true }, 
        password: { type: String, required: true },
        name: { type: String, required: true },
        adress: { type: String, required: true },
        age: { type: Number, required: true },
        phone: { type: String, required: true },
        avatar: { type: String}
    }
);

class UsersContainer extends ContainerMongo {
    constructor(){
        super("users", usersSchema)
    }

    async getByUsername(username) {
        const user = await this.collection.findOne({ username: username })
        return user
    }
}

export { UsersContainer };