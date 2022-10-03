import { Router } from 'express'
import { adaptRout } from '../adapters/adapt-router-express'
import { loginControllerFactory } from '../factories/controllers/login-controller-factory'
import { auth } from '../middlewares/auth'


// import { auth } from '../middlewares/auth'

export default (router: Router) => {
  router.post('/login', adaptRout(loginControllerFactory()))
  router.get('/teste', auth,(req,res) => {
    return res.json('hello world 1')
  })
}