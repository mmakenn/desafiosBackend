import { Router } from 'express';
import { ProductsContainer } from '../containers/productsContainer.js';

const routerShop = new Router();
const ADMIN_USER = true;
const productsList  = new ProductsContainer()

function checkContent(products){
    return (products.length > 0);
}

function checkUser(req, res, next) {
    if (ADMIN_USER) {
        next();
    } else {
        res.sendStatus(401);
    }
}

/* -------------------------------ROUTER------------------------------- */
routerShop.get('/', (req, res) => {
    productsList.getAll()
        .then(products => {
            const areProducts = checkContent(products);
            if (areProducts){
                res.status(200).json( {products: products} );
            } else {
                res.status(204).json( {error: 'No content'} );
            }
        });
});

routerShop.get('/:id', (req, res) => {
    const { params } = req;
    productsList.getById(params.id)
        .then(found => {
            if (! found){
                res.status(204).json( {error: 'No content'} );
            } else {
                res.status(200).json( {product: found} );
            }
        });
});

routerShop.post('/', checkUser, (req, res) => {
    const { body } = req;
    productsList.save(body)
        .then(id => {
            res.status(201).json( {id: id} );
        })
});

routerShop.put('/:id', checkUser, (req, res) => {
    const { body, params } = req;
    productsList.update(params.id, body.price, body.stock)
        .then(result => {
            if (result){
                res.sendStatus(200);
            } else {
                res.status(304).json( {error: `Product id: ${params.id} not found`} );
            }
        });
});

routerShop.delete('/:id', checkUser, (req, res) => {
    const { params } = req;
    productsList.deleteById(params.id)
        .then(result => {
            if (result){
                res.sendStatus(200);
            } else {
                res.status(304).json( {error: `Product id: ${params.id} not found`} );
            }
        })
});

export { routerShop };