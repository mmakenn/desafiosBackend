import 'dotenv/config'

const dbConfig = {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}

export const mariaDB = {
    client: 'mysql2',
    connection: dbConfig
}

export const mongoDB = {
    urlServer: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.6zovj.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`,
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

export const infoProcess = {
    args: process.argv,
    so: process.platform,
    nvm: process.version,
    rss: process.memoryUsage().rss,
    path: process.cwd(),
    processID: process.pid,
    folder: process.execPath.split('/').pop()
}

/* Argv(s) */
import parseArgs from 'minimist'

export const PORT = Number(parseArgs(process.argv).port ?? 8080) 