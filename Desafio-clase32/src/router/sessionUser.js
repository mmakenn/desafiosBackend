import logger from '../components/logger.js'
import { Router } from 'express'
const sessionRouter = new Router()

sessionRouter.get('/register', (req, res) => {
    logger.info(`Request to URL: ${req.url} with method: ${req.method}`)

    res.render('register', {error: false})
})

sessionRouter.get('/failRegister', (req, res) => {
    logger.info(`Request to URL: ${req.url} with method: ${req.method}`)

    res.render('register', {error: true})
})

sessionRouter.get('/login', (req, res) => {
    logger.info(`Request to URL: ${req.url} with method: ${req.method}`)

    res.render('logIn', {error: false})
})

sessionRouter.get('/failLogin', (req, res) => {
    logger.info(`Request to URL: ${req.url} with method: ${req.method}`)

    res.render('logIn', {error: true})
})

sessionRouter.get('/logout', (req, res, next) => {
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

export { sessionRouter }