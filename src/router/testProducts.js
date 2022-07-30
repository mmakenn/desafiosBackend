import { Router } from 'express';
import { testingProducts } from '../controllers/testProducts.js';
const testingRouter = new Router();

testingRouter.get('/api/productos-test', 
    testingProducts
);

export { testingRouter }