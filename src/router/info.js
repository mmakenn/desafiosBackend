import { infoProcess } from '../../options.js';
import { Router } from 'express';
const infoRouter = new Router();

infoRouter.get('/api/info', (req, res) => {
    res.render('info', infoProcess)
})

export { infoRouter }