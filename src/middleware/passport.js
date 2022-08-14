import passport from 'passport'
import { Strategy } from 'passport-local'
import { UsersContainer } from '../containers/usersContainer.js';

import logger from '../components/logger.js';

const users = new UsersContainer()

passport.use('register', new Strategy(
    { passReqToCallback: true }, 
    (req, username, password, done) => {
        users.getByUsername(username)
            .then(user => {
                if (user) {
                    logger.error(`Username is already in use.`)
                    return done(null, false)
                } else {
                    const userInfo = req.body
                    users.save(userInfo)
                        .then(userIdSaved => {
                            if (userIdSaved) {
                                userInfo.id = userIdSaved
                                logger.info(`User saved with ID: ${userIdSaved}`)
                                done(null, userInfo)
                            } else {
                                logger.error("Error trying to save new user.")
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
    
export const authenticationHandler = passport.initialize()
export const sessionHandler = passport.session()
    
    