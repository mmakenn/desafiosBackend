import os from 'os'
import logger from './components/logger.js'

export function createCluster(port) {
    const nCPUs = os.cpus().length

    if (cluster.isPrimary) {
        logger.info(`There is ${nCPUs} CPUs availables`)
        logger.info(`PID MASTER ${process.pid}`)

        for (let i = 0; i < nCPUs; i++) {
            cluster.fork()
        }

        cluster.on('exit', (worker, code, signal) => {
            logger.info(`Worker ${worker.process.pid} died`)
            cluster.fork()
        })
    } else {
        createServer(port)
    }
}