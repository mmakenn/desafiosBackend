import { ProductsApi } from "../api/productos.js";
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

const schema = buildSchema(`
    input ProductInput {
        title: String
        price: Float
        stock: Int
    }

    type Product {
        id: ID!
        title: String
        price: Float
        stock: Int
    }

    type Query {
        getAll: [Product]
        getProduct(id: String): Product
    }

    type Mutation {
        save(info: ProductInput) : String
        update(id: String, price: Float, stock: Int): Boolean
    }
`);

export class GraphQLController {
    constructor() {
        const api = new ProductsApi();
        return graphqlHTTP({
            schema,
            rootValue: {
                getAll: api.getProduct,
                getProduct: api.getProducts,
                save: api.saveProduct,
                update: api.updateProduct
            },
            graphiql: true
        })
    }
}