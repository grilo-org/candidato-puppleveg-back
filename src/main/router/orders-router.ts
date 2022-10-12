import { Request, Response, Router } from 'express'
import client from '../../infra/db/postgres/client'

export const orderRouter = (router: Router) => {
    router.get('/orders', async (req: Request, res: Response) => {
        try {
            const query = `select r.status, r.data, s.name as nameService, a.name as nameAnimal, a.species, s.value, r.id
            from request as r, service as s, animal as a
            where r.fk_service_id = s.id and r.fk_animal_id = a.id`

            const orders = (await client.query(query)).rows
            
            return res.send(orders)
          }
          catch (error) {
            return res.status(500).json('Server Error.')
          }
    })
    router.post('/orders', async (req: Request, res: Response) => {
        try {
            const { fk_service_id, fk_animal_id, status } = req.body
            const insertCostumer = `insert into request values ('${fk_service_id}','${fk_animal_id}', NOW(),'${status}')`
            await client.query(insertCostumer)
            console.log('successo?');
            
            return res.json({ status: 'Criado com sucesso.' })
          } catch (error) {
            return res.json(error)
          }
    })
    router.put('/orders/:id', async (req: Request, res: Response) => {
      try {
          const {id} = req.params
          const { status  } = req.body
          const query = `update REQUEST SET status='${status}' where id=${id}`
          const order = await (await client.query(query)).rows[0]
          res.json(order)
        } catch(error){
          return res.status(500)
        }
  })
   
}