import * as path from 'path';

export const sqlite3DB = {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(path.dirname("chat.sqlite"), "src/components/database/chat.sqlite")
    },
    useNullAsDefault: true
}

const dbConfig = {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'mysqldbpass',
    database: 'desafio'
}

export const mariaDB = {
    client: 'mysql2',
    connection: dbConfig
}