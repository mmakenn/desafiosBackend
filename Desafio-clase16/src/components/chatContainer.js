import knex from 'knex';

class ChatContainer {
    constructor(tableName, config){
        this.knex = knex(config);
        this.name = tableName;
    }

    //Tabla con los campos de los mensajes del chat.
    async newTable() {
        try {
            const exists = await this.knex.schema.hasTable(this.name);
            if (!exists) {
                await this.knex.schema.createTable(this.name, table => {
                    table.increments('id'),
                    table.string('user'),
                    table.string('text'),
                    table.string('date')
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

    async save(message) {
        try {
            await this.knex(this.name).insert(message);
            console.log('Message saved');
        }
        catch(err) {
            console.error(err);
        }
    }

    close(){
        this.knex.destroy();
    }
}

export { ChatContainer };