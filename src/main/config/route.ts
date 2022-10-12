import { Router } from 'express'
import { animalRouter } from '../router/animal-router'
import { costumerRouter } from '../router/costumer-router'
import { employeeRoute } from '../router/employee-router'
import { loginRouter } from '../router/login-router'
import { orderRouter } from '../router/orders-router'
import { serviceRouter } from '../router/services-router'

export default (router: Router) => {
  loginRouter(router)
  employeeRoute(router) 
  costumerRouter(router)
  animalRouter(router)
  serviceRouter(router)
  orderRouter(router)
}