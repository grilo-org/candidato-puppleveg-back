import { Request, Response } from 'express'
import { Controller } from '../../presentation/protocols/controller'

export const adaptRout = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const response = await controller.handle(req)
    res.status(response.statusCode).json(response.body)
  }
}