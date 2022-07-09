import mongoose from "mongoose";
import { ContainerMongo } from "./containerMongo.js";

const usersSchema = new mongoose.Schema(
    {
        username: { type: String, required: true }, 
        password: { type: String, required: true },
        email: { type: String, required: true }
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