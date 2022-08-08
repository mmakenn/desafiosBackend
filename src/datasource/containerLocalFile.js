import fs from 'fs';
import logger from '../components/logger.js';

class ContainerFile {
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
            logger.error(`Impossible to read file '${this.fileName}'. ${error}`);
        }
    }

    async save(object) {
        try {
            const objects = await this.getAll();
            const newId = objects.length + 1;
            object.id = newId;
            objects.push(object);
            const newTexto = JSON.stringify(objects);
            await fs.promises.writeFile(this.fileName, newTexto);
            return newId;
        } catch (error) {
            logger.error(`Impossible to save in file '${this.fileName}'. ${error}`);
        }
    }

    async getById(idIn) {
        const id = parseInt(idIn);
        try {
            const objects = await this.getAll();
            const found = objects.find(object => object.id === id);
            return found ? found : null;
        } catch (error) {
            logger.error(`Impossible to read file '${this.fileName}'. ${error}`);
        }
    }

    async deleteById(idIn) {
        const id = parseInt(idIn);
        try {
            const objects = await this.getAll();
            const foundIndex = objects.findIndex(object => object.id === id);
            if (foundIndex === -1) {
                return false;
            }
            objects.splice(foundIndex, 1);
            const newTexto = JSON.stringify(objects);
            await fs.promises.writeFile(this.fileName, newTexto);
            return true;
        } catch (error) {
            logger.error(`Impossible to read file '${this.fileName}'. ${error}`);
        }
    }
}

export { ContainerFile };