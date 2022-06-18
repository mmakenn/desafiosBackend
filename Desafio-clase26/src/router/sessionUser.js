import { auth } from './authUser.js'
import { Router } from 'express'
const sessionRouter = new Router()

sessionRouter.get('/register', (req, res) => {
    res.render('register', {error: false})
})

sessionRouter.get('/failRegister', (req, res) => {
    res.render('register', {error: true})
})

sessionRouter.get('/login', (req, res) => {
    res.render('logIn', {error: false})
})

sessionRouter.get('/failLogin', (req, res) => {
    res.render('logIn', {error: true})
})

sessionRouter.get('/logout', (req, res, next) => {
    if (req.isAuthenticated()) {
        const username = req.user.username
        req.logout((err) => {
            if (err) {
                return next(err)
            }
        })
        res.render('logOut', {user: username})
    } else {
        res.render('logOut', {user: ""})
    }
})

sessionRouter.get('/api/productos', auth, (req, res, next) => {
    res.render('body', {user: req.user.username});
});


export { sessionRouter }