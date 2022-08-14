import mongoose from "mongoose";
import { ContainerMongo } from "./containerMongo.js";

const cartSchema = new mongoose.Schema({
    products: { type: Array, required: true }
});

async function updateAndResolve(collection, id, newProductsArray){
    const info = await collection.updateOne(
        { _id: id },
        { $set: { products: newProductsArray } }
    );
    if (info.modifiedCount == 0) {
        return false;
    }
    return true;
}

class CartsContainer extends ContainerMongo {
    constructor(){
        super('cart', cartSchema);
    }
    
    async addCart() {
        const info = await this.collection.create( { products: [] } );
        return info.id;
    }
    
    async save(idCart, product) {
        const cart = await super.getById(idCart);
        if (! cart) {
            return false;
        }
        const products = cart.products;
        products.push(product);
        return updateAndResolve(this.collection, idCart, products);
    }

    async reset(idCart) {
        return updateAndResolve(this.collection, idCart, []);
    }

    async deleteProductFromCartId(idCart, idProduct) {
        const cart = await super.getById(idCart);
        if (! cart) {
            return false;
        }
        const products = cart.products;
        const index = products.findIndex(product => product.id === idProduct);
        products.splice(index, 1);
        return updateAndResolve(this.collection, idCart, products);
    }
}

export { CartsContainer };