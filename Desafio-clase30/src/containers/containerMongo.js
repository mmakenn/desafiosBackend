import mongoose from "mongoose";
import { mongoDB } from '../../options.js';

mongoose.connect(mongoDB.urlServer, mongoDB.options);

class ContainerMongo {
    constructor(collecName, schema) {
        this.collection = mongoose.model(collecName, schema);
    }

    async getAll() {
        const all = await this.collection.find({});
        return all;
    }

    async save(object) {
        try {
            const info = await this.collection.create(object);
            return info.id;
        } catch (err) {
            console.log('Error, not saved.')
        }
    }

    async getById(idIn) {
        const objects = await this.collection.find({_id: idIn});
        if (objects.length == 0) {
            return null;
        }
        return objects[0];
    }

    async deleteById(idIn) {
        const info = await this.collection.deleteOne({_id: idIn});
        if (info.deletedCount == 0){
            return false;
        }
        return true;
    }

    async close() {
        await mongoose.disconnect();
    }
}

export { ContainerMongo };