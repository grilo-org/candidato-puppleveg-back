import { Router } from 'express'
import { costumerRouter } from '../router/costumer-router'
import { employeeRoute } from '../router/employee-router'
import { loginRouter } from '../router/login-router'

export default (router: Router) => {
  loginRouter(router)
  employeeRoute(router) 
  costumerRouter(router)
}