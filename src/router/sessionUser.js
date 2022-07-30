import { Router } from 'express'
import { showLogInForm, showLogInFormFail, 
    showLogOutForm, 
    showRegisterForm, showRegisterFormFail } from '../controllers/sessionUser.js'
const sessionRouter = new Router()

sessionRouter.get('/register',
    showRegisterForm
)

sessionRouter.get('/failRegister',
    showRegisterFormFail
)

sessionRouter.get('/login',
    showLogInForm
)

sessionRouter.get('/failLogin',
    showLogInFormFail
)

sessionRouter.get('/logout',
    showLogOutForm
)

export { sessionRouter }