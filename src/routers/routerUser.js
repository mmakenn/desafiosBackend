import logger from '../components/logger.js'
import { uploadFile } from '../middleware/multer.js'
import passport from 'passport'
import { notificationsSingUp } from '../controllers/notifications.js' 

import { Router } from 'express'
const routerUser = new Router()

routerUser.get('/singUp', (req, res) => {
    logger.info(`Request to URL: ${req.url} with method: ${req.method}`)

    res.render('singUp', {error: false})
})

routerUser.get('/failSingUp', (req, res) => {
    logger.info(`Request to URL: ${req.url} with method: ${req.method}`)

    res.render('singUp', {error: true})
})

routerUser.get('/login', (req, res) => {
    logger.info(`Request to URL: ${req.url} with method: ${req.method}`)

    res.render('logIn', {error: false})
})

routerUser.get('/failLogin', (req, res) => {
    logger.info(`Request to URL: ${req.url} with method: ${req.method}`)

    res.render('logIn', {error: true})
})

routerUser.get('/logout', (req, res, next) => {
    logger.info(`Request to URL: ${req.url} with method: ${req.method}`)
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

routerUser.post('/singUp', uploadFile, notificationsSingUp,
    passport.authenticate('register', { 
        failureRedirect: '/failSingUp',
        successRedirect: '/login'
    })
)

routerUser.post('/login', 
    passport.authenticate('login', { 
        failureRedirect: '/failLogin',
        successRedirect: '/api/productos'
    })
)

export { routerUser }