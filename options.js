/* ---> ENVIROMENT <--- */
import 'dotenv/config'

export const port = process.env.PORT ?? 8080

export const persistance = process.env.PERS ? process.env.PERS.trim() : process.env.PERS; 

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

export const localFile = {
    path_products: './src/datasource/local/products.txt',
    path_carts: './src/datasource/local/carts.txt'
}

/* ---> PROCESS <--- */
import os from 'os'

export const infoProcess = {
    args: process.argv,
    so: process.platform,
    nvm: process.version,
    rss: process.memoryUsage().rss,
    cpus: os.cpus().length,
    path: process.cwd(),
    processID: process.pid,
    folder: process.execPath.split('/').pop()
}

/* ---> Argv(s) <--- */
import parseArgs from 'minimist'

export const server_mode = parseArgs(process.argv).server_mode ?? 'fork'