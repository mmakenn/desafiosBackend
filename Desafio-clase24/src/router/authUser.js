export function auth(req, res, next) {
    console.log('Requerimiento de autentificación, user:');
    console.log(req.session.user);
    if (!req.session.user){
        res.redirect('/login');
    } else {
        next();
    }
}