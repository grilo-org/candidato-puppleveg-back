import { adaptMiddleware } from '../adapters/adapt-middleware-express'
import { authMiddlewareFactory } from '../factories/middlewares/auth-middleware-factory'


export const auth = adaptMiddleware(authMiddlewareFactory())