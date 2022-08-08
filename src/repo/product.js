import Product from '../models/product.js'
import { productsList } from '../DAOs/factoryDAO.js'
import { asDto } from '../DTOs/product.js'

export class ProductRepo {
    #dao

    constructor() {
        this.#dao = productsList
    }

    async getAll() {
        const products = await this.#dao.getAll()
        return products.map(p => new Product(p))
    }

    async getById(idIn) {
        const dto = await this.#dao.getById(idIn)
        return new Product(dto)
    }

    async save(product) {
        await this.#dao.save(asDto(product))
    }

    async deleteById(idIn) {
        const result = await this.#dao.deleteById(idIn)
        return result
    }

    async deleteAll() {
        await this.#dao.deleteAll()
    }
}