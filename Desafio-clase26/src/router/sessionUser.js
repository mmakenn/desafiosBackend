import { auth } from './authUser.js'
import { Router } from 'express'
const sessionRouter = new Router()

sessionRouter.get('/register', (req, res) => {
    res.render('register')
})

sessionRouter.get('/login', (req, res) => {
    res.render('logIn', {error: false})
})

sessionRouter.get('/logout', (req, res) => {
    const username = req.session.user
    if (req.isAuthenticated()) {
        req.logout()
    }
    res.render('logOut', {user: username})
})

sessionRouter.get('/api/productos', auth, (req, res, next) => {
    res.render('body', {user: req.session.passport.user});
});


export { sessionRouter }