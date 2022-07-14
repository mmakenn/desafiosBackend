import logger from "../components/logger.js"
import { Router } from "express"
const randomRouter = new Router()
import { fork } from 'child_process'

randomRouter.get("/api/randoms", (req, res) => {
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
})

export { randomRouter }