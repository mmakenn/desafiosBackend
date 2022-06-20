export function auth(req, res, next) {
    console.log('Requerimiento de autentificación, user:')
    if (req.isAuthenticated()){
        next()
    } else {
        res.redirect('/login')
    }
}