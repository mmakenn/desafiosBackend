import os from 'os'

export function createCluster(port) {
    const nCPUs = os.cpus().length

    if (cluster.isPrimary) {
        console.log(`There is ${nCPUs} CPUs availables`)
        console.log(`PID MASTER ${process.pid}`)

        for (let i = 0; i < nCPUs; i++) {
            cluster.fork()
        }

        cluster.on('exit', (worker, code, signal) => {
            console.log(`Worker ${worker.process.pid} died`)
            cluster.fork()
        })
    } else {
        createServer(port)
    }
}