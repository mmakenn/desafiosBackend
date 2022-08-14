import logger from "../components/logger.js"

export function auth(req, res, next) {
    logger.info('REQUIRED: Trying to identify user...')
    if (req.isAuthenticated()){
        logger.info(`Authorized - username: ${req.user.username}`)
        next()
    } else {
        logger.info('Not authenticated. Redirecting to /login')
        res.redirect('/login')
    }
}