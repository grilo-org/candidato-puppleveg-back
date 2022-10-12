import { Request, Response, Router } from 'express'
import client from '../../infra/db/postgres/client'

export const serviceRouter = (router: Router) => {
    router.get('/services', async (req: Request, res: Response) => {
        try {
            const query = `select * from service`
            const services = (await client.query(query)).rows
            return res.send(services)
          }
          catch (error) {
            return res.status(500).json('Server Error.')
          }
    })
    router.post('/services', async (req: Request, res: Response) => {
        try {
            const { value, name, whichspecies } = req.body
            const insertServiceQuery = `insert into service values ('${value}','${name}','${whichspecies}')`
            await client.query(insertServiceQuery)
            return res.json({ status: 'Criado com sucesso.' })
          } catch (error) {
            return res.status(500).json(error)
          }
    })

    router.get('/services/:id', async (req: Request, res: Response) => {
        try {
          const { cpf: id } = req.params
          
          const insertCostumerQuery = `select * from service where id='${id}'`
          const costumer = await (await client.query(insertCostumerQuery)).rows[0]
          return res.json(costumer)
        } catch (error) {
          return res.status(400).json(error)
        }
      })
     
      router.delete('/services/:id', async (req: Request, res: Response) => {
        try {
          const { id } = req.params
          
          const deleteCostumerQuery = `delete from service where id='${id}'`
          await client.query(deleteCostumerQuery)
          return res.json({ status: 'Serviço deletado com sucesso.' })
        } catch (error) {
          return res.status(500).json(error)
        }
      })

      router.put('/services/:id', async (req: Request, res: Response) => {
        try {
          const { id } = req.params
          const { name, value, whichspecies } = req.body

          const animalExistsQuery = `SELECT * from service where id='${id}'`
          const animalExists = await (await client.query(animalExistsQuery)).rows[0]
          if (!animalExists)
            return res.status(400).json({ message: 'O id informado não está cadastrado.' })
         
          const updateEmployeeQuery = `update service SET name='${name}', value='${value}',whichspecies='${whichspecies}' WHERE id='${id}' `
          const animal = await (await client.query(updateEmployeeQuery)).rows[0]
          return res.json(animal)
        } catch (error) {
          return res.json(error)
        }
      })
}