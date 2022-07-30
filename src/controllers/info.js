import logger from '../components/logger.js';
import { infoProcess } from '../../options.js';

export function showProcessInfo(req, res) {
    logger.info(`Request to URL: ${req.url} with method: ${req.method}`)
    res.render('info', infoProcess)
}