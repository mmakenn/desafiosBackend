/* Initialize */
import express from 'express'
import { Server as HttpServer } from 'http'
import { Server as Socket } from 'socket.io'
/* Session and Passport for authentication */
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { mongoDB } from '../options.js';
import passport from 'passport'
import { Strategy } from 'passport-local'
import { UsersContainer } from './components/usersContainer.js'
/* Handlebars */
import Handlebars from 'express-handlebars'
import { handlebarsConfig } from "../options.js"
/* Routers */
import { sessionRouter } from './router/sessionUser.js'
import { infoRouter } from './router/info.js'
import { randomRouter } from './router/randoms.js'
import { testingRouter } from "../src/test/testProducts.js"
/* Websockets connection functions */
import { emitChat } from "./router/chat.js"
import { emitProducts } from "./router/products.js"


export function createServer(port) {
    const app = express()
    const httpServer = new HttpServer(app)
    const io = new Socket(httpServer)
    
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use('/public', express.static('public'))
    
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
    
    app.engine('.hbs', Handlebars.engine(handlebarsConfig))
    app.set('view engine', '.hbs')
    app.set('views', './src/views')
    
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
    
    app.use(sessionRouter)
    app.use(infoRouter)
    app.use(randomRouter)
    
    io.on('connection', socket => {
        console.log("Conexion con el cliente establecida.")
        emitProducts(socket, io)
        emitChat(socket, io)
    })
    
    app.use(testingRouter)
    
    const connectedServer = httpServer.listen(port, () => {
        console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
    })
    connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
}