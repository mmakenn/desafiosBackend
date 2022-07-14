class Contenedor{
    constructor() {
        this.products = [];
    }

    getAll() {
        return this.products; 
    }

    save(object) {
        let newId = 1;
        if (this.products.length > 0 ){
            newId = this.products[this.products.length - 1].id + 1;
        }
        object.id = newId;
        this.products.push(object);
        return newId;
    }

    update(id, title, price, thumbnail){
        const idNumber = parseInt(id);
        const founded = this.getById(idNumber);
        if (! founded){
            return false;
        }

        if (title){
            founded.title = title;
        }
        if (price){
            founded.price = price;
        }
        if (thumbnail){
            founded.thumbnail = thumbnail;
        }
        return true;    
    }

    getById(id) {
        const idNumber = parseInt(id);
        const founded = this.products.find(object => object.id === idNumber);
        return founded ? founded : null;
    }

    deleteById(id) {
        const idNumber = parseInt(id);
        const foundedIndex = this.products.findIndex(object => object.id === idNumber);
        if (foundedIndex === -1) {
            return false;
        }
        this.products.splice(foundedIndex, 1);
        return true
    }
}


module.exports = {Contenedor};