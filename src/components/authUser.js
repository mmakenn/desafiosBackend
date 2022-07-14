export function auth(req, res, next) {
    console.log('Requerimiento de autentificación.')
    if (req.isAuthenticated()){
        console.log(`User ${req.user.username}`)
        next()
    } else {
        res.redirect('/login')
    }
}