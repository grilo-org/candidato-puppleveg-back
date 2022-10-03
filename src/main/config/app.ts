import express, { Router } from 'express'
import setupRouter from './route'
import setupMiddleware from './middleware'
const app = express()
setupMiddleware(app)
const router = Router()
app.use('/api', router)

setupRouter(router)

export default app