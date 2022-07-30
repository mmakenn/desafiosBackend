import { Router } from 'express';
const infoRouter = new Router();
import compression from 'compression'
import { showProcessInfo } from '../controllers/info.js';

infoRouter.get('/api/info', 
    showProcessInfo
)

infoRouter.get('/api/info-comp', 
    compression,
    showProcessInfo
)

export { infoRouter }