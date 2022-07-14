import knex from 'knex';

class ProductsContainer {
    constructor(tableName, config){
        this.knex = knex(config);
        this.name = tableName;
    }

    //Tabla con los campos de los productos.
    async newTable() {
        try {
            const exists = await this.knex.schema.hasTable(this.name);
            if (!exists) {
                await this.knex.schema.createTable(this.name, table => {
                    table.increments('id'),
                    table.string('title'),
                    table.integer('stock'),
                    table.float('price'),
                    table.string('thumbnail')
                });
                console.log(`Table ${this.name} created.`);
            } else {
                console.log(`Table ${this.name} already exists.`);
            }
        }
        catch(err) {
            console.error(err);
        }
    }

    async getAll() {
        try {
            const rows = await this.knex.from(this.name).select("*");
            return rows;
        }
        catch(err) {
            console.error(err);
        }
    }

    async save(product) {
        try {
            await this.knex(this.name).insert(product);
            console.log('Product saved');
        }
        catch(err) {
            console.error(err);
        }
    }

    async getById(idIn) {
        const id = parseInt(idIn);
        try {
            const rows = await this.knex.from(this.name).select("*").where("id", id);
            return rows;
        }
        catch(err) {
            console.error(err);
        }
    }

    async deleteById(idIn) {
        const id = parseInt(idIn);
        try {
            const affected = await this.knex.from(this.name).select("*").where("id", id).del();
            if (affected === 0){
                console.log('Product not found');
            } else {
                console.log('Product deleted');
            }
        }
        catch(err) {
            console.error(err);
        }
    }

  /*   
    async update(idIn, price, stock){
        const id = parseInt(idIn);
        try {
            const products = await this.getAll();
            const foundIndex = products.findIndex(product => product.id === id);
            if (foundIndex === -1) {
                return false;
            }
            const found = products.splice(foundIndex, 1)[0];
            if (price){
                found.price = price;
            }
            if (stock){
                found.stock = stock;
            }
            products.push(found);
            const newTexto = JSON.stringify(products)
            await fs.promises.writeFile(this.fileName, newTexto);
            return true
        } catch (error) {
            console.log(error);
        }
    } */

    close() {
        this.knex.destroy();
        console.log('Table closed');
    }
}

export { ProductsContainer };