import { Express, json } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
export default (app: Express) => {
  app.use(json())
  app.use(cors())
  app.use(bodyParser.json())
}