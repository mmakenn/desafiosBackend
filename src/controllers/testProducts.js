import logger from '../components/logger.js';

//--------------------------------------------
// Test de productos con Faker
import { faker } from '@faker-js/faker';
faker.locale = 'es';

export function testingProducts(req, res) {
    logger.info(`Request to URL: ${req.url} with method: ${req.method}`)
    const productsTest = [];
    for (let i = 0; i < 5; i++){
        productsTest.push(
            {
                title: faker.commerce.product(),
                price: faker.commerce.price(),
                thumbnail: faker.image.image(),
                stock: faker.random.numeric()
            }
            )
        }
    res.render('productList', { products: productsTest, productsExists: true});
};
