import { logger } from "./logger.js"

export function auth(req, res, next) {
    console.log('Requerimiento de autentificación.')
    if (req.isAuthenticated()){
        logger.info(`Authorized - username: ${req.user.username}`)
        next()
    } else {
        logger.info('Not authenticated. Redirecting to /login')
        res.redirect('/login')
    }
}