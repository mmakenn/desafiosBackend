import { auth } from '../components/authUser.js'
import { showProducts } from '../controllers/api.js'
import { Router } from 'express'

const apiRouter = new Router()

apiRouter.get('/api/productos', auth, 
    showProducts
)

export { apiRouter }