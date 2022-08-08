export default class Product {
    #id
    #title
    #price
    #stock

    constructor({ id, title, price, stock }) {
        this.id = id
        this.title = title
        this.price = price
        this.stock = stock
    }

    get id() { return this.#id }

    set id(id) {
        if (!id) throw new Error('"id": Required field ommited')
        this.#id = id
    }

    get title() { return this.#title }

    set title(title) {
        if (!title) throw new Error('"title": Required field ommited')
        this.#title = title
    }

    get price() { return this.#price }

    set price(price) {
        if (!price) throw new Error('"price": Required field ommited')
        if (isNaN(price)) throw new Error('"price" must be a number')
        this.#price = price
    }

    get stock() { return this.#stock }

    set stock(stock) {
        if (!stock) throw new Error('"stock": Required field ommited')
        if (isNaN(stock)) throw new Error('"stock" must be a number')
        this.#stock = stock
    }

    data() {
        return JSON.parse(JSON.stringify({
            id: this.#id,
            title: this.#title,
            price: this.#price,
            stock: this.#stock
        }))
    }
}
