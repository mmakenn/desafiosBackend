import 'dotenv/config'

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

export const PORT = process.env.PORT ?? 8080

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


/* Argv(s) */
import parseArgs from 'minimist'

export const SERVER_MODE = parseArgs(process.argv).server_mode ?? 'fork'