import logger from "../components/logger.js"
import { fork } from 'child_process'

export function showRandomNumbers(req, res) {
    logger.info(`Request to URL: ${req.url} with method: ${req.method}`)

    const cantNumbers = parseInt(req.query.cant ? req.query.cant : 100000000)
    
    const randomize = fork('./src/api/randoms.js')
    randomize.on('message', (result) => {
        if (result === 'starting') {
            randomize.send(cantNumbers)
        } else {
            res.json(result)
        }
    })
}