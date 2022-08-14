import mongoose from "mongoose";
import { ContainerMongo } from "./containerMongo.js";

const productsListSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    description: { type: String },
    image: { type: String }
});

class ProductsContainer extends ContainerMongo {
    constructor(){
        super('products', productsListSchema);
    }

    async update(idIn, price, stock){
        const info = await this.collection.updateOne(
            { _id: idIn },
            { $set: { price: price, stock: stock } }
        );
        if (info.modifiedCount == 0) {
            return false;
        }
        return true;
    }
}

export { ProductsContainer }