class ContainerMemory {
    constructor() {
        this.mem = [];
        this.lastId = 0;
    }

    async getAll() {
        return this.mem;
    }

    async save(object) {
        object.id = this.lastId;
        this.mem.push(object);
        this.lastId++;
    }

    async getById(idIn) {
        const found = objects.find(object => object.id === idIn);
        return found ? found : null;
    }

    async deleteById(idIn) {
        const foundIndex = objects.findIndex(object => object.id === idIn);
        if (foundIndex === -1) {
            return false;
        }
        objects.splice(foundIndex, 1);
        return true;
    }
}

export { ContainerMemory };