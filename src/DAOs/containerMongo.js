import mongoose from "mongoose";
import { mongoDB } from "../../config.js";
import logger from '../components/logger.js'

try {
    await mongoose.connect(mongoDB.urlServer, mongoDB.options)
} catch (err) {
    logger.error(`Error with connection
                Database error:
                \t ${err}`)
}

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
            logger.error(`Error, object ${object} not saved:
                Database error:
                \t ${err}`)
        }
    }

    async getById(idIn) {
        const objects = await this.collection.find({id: idIn});
        if (objects.length == 0) {
            logger.error(`Error, object with id ${idIn} not found`)
            return null;
        }
        return objects[0];
    }

    async deleteById(idIn) {
        const info = await this.collection.deleteOne({id: idIn});
        if (info.deletedCount == 0){
            logger.error(`Error, object with id ${idIn} not found, can't be deleted.`)
            return false;
        }
        return true;
    }

    async close() {
        await mongoose.disconnect();
    }
}

export { ContainerMongo };