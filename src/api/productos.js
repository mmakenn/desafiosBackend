import { Product } from "../models/products.js";
import { ProductsContainer } from "../DAOs/productsContainer.js";

export class ProductsApi {
    constructor() {
        this.dao = new ProductsContainer();
    }

    getProducts() {
        return this.dao.getAll();
    }

    saveProduct(info) {
        const product = new Product(info);
        this.dao.save(product);
        return product;
    }

    getProduct(id) {
        return this.dao.getById(id);
    }

    deleteProduct(id) {
        return this.dao.deleteById(id);
    }

    updateProduct(id, stock, price) {
        return this.dao.update(id, stock, price);
    }
}