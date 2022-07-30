import session from 'express-session';

import MongoStore from 'connect-mongo';
import { mongoDB } from '../../options.js';

import passport from 'passport'
import { Strategy } from 'passport-local'
import { UsersContainer } from '../database/usersContainer.js';


export function setPassport(app) {
    app.use(session({
        store: MongoStore.create({
            mongoUrl: mongoDB.urlServer,
            mongoOptions: mongoDB.advancedOptions
        }),
        secret: 'cookieForUserLogin',
        resave: true,
        rolling: true,
        saveUninitialized: false,
        cookie: {
            maxAge: 40000
        }
    }))

    const users = new UsersContainer()
    
    passport.use('register', new Strategy(
        { passReqToCallback: true }, 
        (req, username, password, done) => {
            users.getByUsername(username)
                .then(user => {
                    if (user) {
                        return done(null, false)
                    } else {
                        const userInfo = req.body
                        users.save(userInfo)
                            .then(userIdSaved => {
                                if (userIdSaved) {
                                    userInfo.id = userIdSaved
                                    done(null, userInfo)
                                } else {
                                    return done(null, false)
                                }
                            })
                    }
                })
        }
    ))
    
    passport.use('login', new Strategy( 
        (username, password, done) => {
            users.getByUsername(username)
                .then(user => {
                    if (!user){
                        return done(null, false)
                    }
                    if (user.password !== password) {
                        return done(null, false)
                    }
                    done(null, user)
                })
        }
    ))
    
    passport.serializeUser((user, done) => {
        const userSessionInfo = {
            id: user.id,
            username: user.username
        }
        done(null, userSessionInfo)
    })
    
    passport.deserializeUser((userSessionInfo, done) => {
        done(null, userSessionInfo)
    })
    
    app.use(passport.initialize())
    app.use(passport.session())
    
    app.post('/register', 
        passport.authenticate('register', { 
            failureRedirect: '/failRegister',
            successRedirect: '/login'
        })
    )
    
    app.post('/login', 
        passport.authenticate('login', { 
            failureRedirect: '/failLogin',
            successRedirect: '/api/productos'
        })
    )
}