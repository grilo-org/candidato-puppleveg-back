import { Router } from 'express'
import { adaptRout } from '../adapters/adapt-router-express'
import { loginControllerFactory } from '../factories/controllers/login-controller-factory'
import { signUpControllerFactory } from '../factories/controllers/signup-controller-factory'

export const loginRouter = (router:Router) => {
  router.post('/login', adaptRout(loginControllerFactory()))
  router.post('/signup', adaptRout(signUpControllerFactory()))
}
