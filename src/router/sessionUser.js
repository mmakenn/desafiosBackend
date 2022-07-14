import { admitedPassword } from '../database/options.js';
import { auth } from './authUser.js';

import { Router } from 'express';
const sessionRouter = new Router();

sessionRouter.get('/login', (req, res) => {
    res.render('logIn', {error: false});
});

sessionRouter.post('/login', (req, res) => {
    const { user, password } = req.body;
    if (password === admitedPassword) {
        console.log('Contraseña valida');
        req.session.user = user;
        res.redirect('/api/productos')                         
    } else {
        res.render('logIn', {error: true});
    }
});

sessionRouter.get('/api/productos', auth, (req, res, next) => {
    res.render('body', {user: req.session.user});
});

sessionRouter.get('/logout', (req, res) => {
    const username = req.session.user;
    req.session.destroy(err => {
        if (!err) {
            res.render('logOut', {user: username});
        } else {
            res.send({ status: 'Logout ERROR', body: err })
        }
    })
});

export { sessionRouter }