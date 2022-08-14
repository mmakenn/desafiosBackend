import { Router } from 'express';
import { CartsContainer } from '../containers/cartsContainer.js';
import { notificationsSale } from '../controllers/notifications.js';

const routerCart = new Router();
const carts = new CartsContainer()

function checkContent(products){
    return (products.length > 0);
}

/* -------------------------------ROUTER------------------------------- */
routerCart.post('/', (req, res) => {
    carts.addCart()
        .then(
            newId => {
                res.status(201).json( { cartId: newId } );
            }
        );
});

routerCart.post('/:id/productos', (req, res) =>{
    const { params, body } = req;
    carts.save(params.id, body)
        .then(foundCart => {
            if (foundCart){
                res.sendStatus(200);
            } else {
                res.status(400).json( {error: "Cart id not found"} );
            }
        });
});

routerCart.get('/:id/productos', (req, res) => {
    const { params } = req;
    carts.getById(params.id)
        .then(foundCart => {
            if (foundCart){
                const areProducts = checkContent(foundCart.products);
                if (areProducts){
                    res.status(200).json( {products: foundCart.products} );
                } else {
                    res.status(204).json( {error: 'No content'} );
                }
            } else {
                res.status(400).json( {error: "Cart id not found"} );
            }
        });
});

routerCart.delete('/:id/productos/:id_prod',  (req, res) => {
    const { params } = req;
    carts.deleteProductFromCartId(params.id, params.id_prod)
        .then(foundCart => {
            if (foundCart){
                res.sendStatus(200);
            } else {
                res.status(400).json( {error: "Cart or Product id not found"} );
            }
        });
});

routerCart.delete('/:id',  (req, res) => {
    const { params } = req;
    carts.reset(params.id)
        .then(cartFound => {
            if (cartFound) {
                res.status(200).json( {ok: `Cart id: ${params.id} cleaned` } );
            } else {
                res.status(400).json( {error: "Cart id not found"} );
            }
        });
});

routerCart.post('/:id/checkout', notificationsSale,
    (req, res) => {
        res.sendStatus(200)
    })
export { routerCart };