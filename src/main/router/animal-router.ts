import { Request, Response, Router } from 'express'
import client from '../../infra/db/postgres/client'

export const animalRouter = (router: Router) => {
    router.get('/animals', async (req: Request, res: Response) => {
        try {
            const query = `select a.fk_Costumer_cpf, a.name, a.species, a.breed, a.id, c.name as owner
            from animal as a, costumer as c
            where  a.fk_Costumer_cpf = c.cpf`
            const animals = (await client.query(query)).rows
            return res.send(animals)
          }
          catch (error) {
            return res.json('Server Error.')
          }
    })
    router.post('/animals', async (req: Request, res: Response) => {
        try {
            const { fk_costumer_cpf, name, species, breed } = req.body
            const cpfAlreadyRegistrered = `SELECT name, fk_Costumer_cpf from animal where name='${name} and fk_costumer_cpf = ${fk_costumer_cpf}'`
            const animalsExist = await (await client.query(cpfAlreadyRegistrered)).rows[0]
            if (animalsExist) {
              return res.status(400).json({ message: 'Um animal com esse mesmo nome já existe no cliente selecionado' })
            }
            const insertAnimal = `insert into animal values ('${name}','${species}','${breed}','${fk_costumer_cpf}')`
            await client.query(insertAnimal)
            return res.json({ status: 'Criado com sucesso.' })
          } catch (error) {
            return res.status(500).json(error)
          }
    })

    router.get('/animals/:cpf', async (req: Request, res: Response) => {
        try {
          const { cpf } = req.params
        
          
          const cpfAlreadyRegistrered = `SELECT * from costumer where cpf='${cpf}'`
          const cpfExists = await (await client.query(cpfAlreadyRegistrered)).rows[0]
        
          
          if (!cpfExists) {
            return res.status(400).json({ message: 'O CPF informado não está cadastrado.' })
          }
 
          const insertCostumerQuery = `select distinct a.id , a.name as animalName
          from animal as a, costumer as c
          where a.fk_costumer_cpf = '${cpf}'`
          
          const costumer = await (await client.query(insertCostumerQuery)).rows
          
          return res.json(costumer)
        } catch (error) {
          return res.json(error)
        }
      })
     
      router.delete('/animals/:id', async (req: Request, res: Response) => {
        try {
          const { id } = req.params
          
    
          const cpfAlreadyRegistrered = `SELECT * from animal where id='${id}'`
          const cpfExists = await (await client.query(cpfAlreadyRegistrered)).rows[0]
          if (!cpfExists) {
            return res.status(400).json({ message: 'O ID informado não existe' })
          }
          const deleteCostumerQuery = `delete from animal where id='${id}'`
          await client.query(deleteCostumerQuery)
          return res.json({ status: 'Animal deletado com sucesso.' })
        } catch (error) {
          return res.json(error)
        }
      })

      router.put('/animals/:id', async (req: Request, res: Response) => {
        try {
          const { id } = req.params
          const { name, species, breed } = req.body
          const animalExistsQuery = `SELECT * from animal where id='${id}'`
          const animalExists = await (await client.query(animalExistsQuery)).rows[0]
          if (!animalExists)
            return res.status(400).json({ message: 'O id informado não está cadastrado.' })
         
          const updateEmployeeQuery = `update animal SET name='${name}', species='${species}',breed='${breed}' WHERE id='${id}' `
          const animal = await (await client.query(updateEmployeeQuery)).rows[0]
          return res.json(animal)
        } catch (error) {
          return res.json(error)
        }
      })
      
}