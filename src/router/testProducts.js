import { Router } from 'express';
const testingRouter = new Router();

//--------------------------------------------
// Test de productos con Faker
import { faker } from '@faker-js/faker';
faker.locale = 'es';

testingRouter.get('/api/productos-test', (req, res) => {
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
});

export { testingRouter }