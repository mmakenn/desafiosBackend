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

export const mongoDB = {
    urlServer: 'mongodb+srv://mmakenn:coderhouse@cluster0.6zovj.mongodb.net/desafioclase24?retryWrites=true&w=majority',
    options: {
        serverSelectionTimeoutMS: 5000,
    },
    advancedOptions: { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    }
}

export const handlebarsConfig = {
    extname: '.hbs',
    defaultLayout: 'index.hbs'
}

export const admitedPassword = 'myClass24';