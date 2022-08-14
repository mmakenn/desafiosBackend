import session from 'express-session';

import MongoStore from 'connect-mongo';
import { mongoDB } from '../../config.js';

export function setSession(app) {    
    app.use(session({
        store: MongoStore.create({
            mongoUrl: mongoDB.urlServer,
            mongoOptions: mongoDB.advancedOptions
        }),
        secret: 'oe9tu9eiefmd',
        resave: true,
        rolling: true,
        saveUninitialized: false,
        cookie: {
            maxAge: 40000
        }
    }))
}