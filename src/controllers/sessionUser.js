import logger from '../components/logger.js'

export function showRegisterForm(req, res) {
    logger.info(`Request to URL: ${req.url} with method: ${req.method}`)

    res.render('register', {error: false})
}

export function showRegisterFormFail(req, res) {
    logger.info(`Request to URL: ${req.url} with method: ${req.method}`)

    res.render('register', {error: true})
}

export function showLogInForm(req, res) {
    logger.info(`Request to URL: ${req.url} with method: ${req.method}`)

    res.render('logIn', {error: false})
}

export function showLogInFormFail(req, res) {
    logger.info(`Request to URL: ${req.url} with method: ${req.method}`)

    res.render('logIn', {error: true})
}

export function showLogOutForm(req, res, next) {
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
}
