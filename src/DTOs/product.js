class Product {
    constructor({ id, title, price, stock, description, image }) {
        this.id = id
        this.title = title
        this.price = price
        this.stock = stock
        this.description = description
        this.image = image
    }
}

export function asDto(product) {
    if (Array.isArray(product))
        return product.map(p => new Product(p))
    else
        return new Product(product)
}
