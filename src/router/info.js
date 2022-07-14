import compression from 'compression'
import logger from '../components/logger.js';
import { infoProcess } from '../../options.js';
import { Router } from 'express';
const infoRouter = new Router();

infoRouter.get('/api/info', (req, res) => {
    logger.info(`Request to URL: ${req.url} with method: ${req.method}`)
    // console.log(infoProcess)
    res.render('info', infoProcess)
})

infoRouter.get('/api/info-comp', compression(), (req, res) => {
    logger.info(`Request to URL: ${req.url} with method: ${req.method}`)
    res.render('info', infoProcess)
})

export { infoRouter }