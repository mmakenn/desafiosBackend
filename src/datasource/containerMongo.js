import mongoose from "mongoose";
import { mongoDB } from '../../options.js';
import logger from "../components/logger.js";

class ContainerMongo {
    constructor(collecName, schema) {
        this.collection = mongoose.model(collecName, schema);
    }
    
    async connect() {
        try {
            await mongoose.connect(mongoDB.urlServer, mongoDB.options);
            return true;
        } catch(err) {
            logger.error(`Error trying to connect to MongoDB Service.
                Database error:
                \t ${err}`)
            return false;
        }
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
            logger.error(`Error, object ${object} not saved:
                Database error:
                \t ${err}`);
        }
    }

    async getById(idIn) {
        const objects = await this.collection.find({_id: idIn});
        if (objects.length == 0) {
            logger.error(`Error, object with id ${idIn} not found`);
            return null;
        }
        return objects[0];
    }

    async deleteById(idIn) {
        const info = await this.collection.deleteOne({_id: idIn});
        if (info.deletedCount == 0){
            logger.error(`Error, object with id ${idIn} not found, can't be deleted.`);
            return false;
        }
        return true;
    }

    async close() {
        await mongoose.disconnect();
    }
}

export { ContainerMongo };