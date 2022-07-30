import mongoose from "mongoose";
import { ContainerMongo } from "./containerMongo.js";

const productsSchema = new mongoose.Schema(
    {
        title: { type: String, required: true }, 
        price: { type: Number, required: true },
        thumbnail: { type: String, required: true },
        stock: { type: Number, required: true }
    }
);

class ProductsContainer extends ContainerMongo {
    constructor(){
        super("products", productsSchema)
    }
}

export { ProductsContainer };