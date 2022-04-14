const fs = require('fs')

class Contenedor{
    constructor(fileName) {
        this.fileName = fileName;
    }

    async getAll() {
        try {
            const texto = await fs.promises.readFile(this.fileName, {encoding: 'utf-8', flag: 'a+'});
            if (texto === "") {
                return [];
            }
            return JSON.parse(texto); 
        } catch (error) {
            console.log(error)
        }
    }

    async save(object) {
        try {
            const objects = await this.getAll();
            const newId = objects.length + 1;
            object.id = newId;
            objects.push(object);
            const newTexto = JSON.stringify(objects)
            await fs.promises.writeFile(this.fileName, newTexto);
            return newId;
        } catch (error) {
            console.log(error)
        }
    }

    async getById(idNumber) {
        try {
            const objects = await this.getAll();
            const founded = objects.find(object => object.id === idNumber);
            return founded ? founded : null;
        } catch (error) {
            console.log(error)
        }
    }

    async deleteById(idNumber) {
        try {
            const objects = await this.getAll();
            const foundedIndex = objects.findIndex(object => object.id === idNumber);
            objects.splice(foundedIndex, 1);
            const newTexto = JSON.stringify(objects)
            await fs.promises.writeFile(this.fileName, newTexto);
        } catch (error) {
            console.log(error)
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.fileName, "");
        } catch (error) {
            console.log(error)
        }
    }
}


module.exports = {Contenedor};