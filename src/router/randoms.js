import { Router } from "express"
const randomRouter = new Router()
import { showRandomNumbers } from '../controllers/randoms.js'

randomRouter.get("/api/randoms", 
    showRandomNumbers
)

export { randomRouter }