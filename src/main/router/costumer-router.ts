import { Router } from 'express'
import { adaptRout } from '../adapters/adapt-router-express'


import { auth } from '../middlewares/auth'

export default (route: Router) => {
  route.get('/teste', (req,res) => {
    return res.json('hello world 1')
  })
}