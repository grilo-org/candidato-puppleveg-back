import { Request, Response, Router } from 'express'
import client from '../../infra/db/postgres/client'
import { fakeData } from '../utils/fakeData'

export const costumerRouter = (router: Router) => {
    router.get('/costumers', async (req: Request, res: Response) => {
        try {
            const query = `select * from costumer`
            const costumers = (await client.query(query)).rows
            return res.send(costumers)
          }
          catch (error) {
            return res.json('Server Error.')
          }
    })
    router.post('/costumers', async (req: Request, res: Response) => {
        try {
           fakeData()
            const { cpf, name, address, phone } = req.body
            const cpfAlreadyRegistrered = `SELECT * from Costumer where cpf='${cpf}'`
            const cpfExists = await (await client.query(cpfAlreadyRegistrered)).rows[0]
            if (cpfExists) {
              return res.status(400).json({ message: 'Um cliente com esse cpf já existe' })
            }
            const insertCostumer = `insert into costumer values ('${cpf}','${name}','${address}','${phone}')`
            
            
            await client.query(insertCostumer)
           
            
            return res.json({ status: 'Criado com sucesso.' })
          } catch (error) {
            return res.json(error)
          }
    })

    router.get('/costumers/:cpf', async (req: Request, res: Response) => {
        try {
          const { cpf } = req.params
          
          const cpfAlreadyRegistrered = `SELECT * from costumer where cpf='${cpf}'`
          const cpfExists = await (await client.query(cpfAlreadyRegistrered)).rows[0]
          if (!cpfExists) {
            return res.status(400).json({ message: 'O CPF informado não está cadastrado.' })
          }
          const insertCostumerQuery = `select * from costumer where cpf='${cpf}'`
          const costumer = await (await client.query(insertCostumerQuery)).rows[0]
          return res.json(costumer)
        } catch (error) {
          return res.json(error)
        }
      })
     
      router.delete('/costumers/:cpf', async (req: Request, res: Response) => {
        try {
          const { cpf } = req.params
          
    
          const cpfAlreadyRegistrered = `SELECT * from costumer where cpf='${cpf}'`
          const cpfExists = await (await client.query(cpfAlreadyRegistrered)).rows[0]
          if (!cpfExists) {
            return res.status(400).json({ message: 'O CPF informado não existe' })
          }
          const deleteCostumerQuery = `delete from costumer where cpf='${cpf}'`
          await client.query(deleteCostumerQuery)
          return res.json({ status: 'Cliente deletado com sucesso.' })
        } catch (error) {
          return res.json(error)
        }
      })

      router.put('/costumer/:cpf', async (req: Request, res: Response) => {
        try {
         
          const { cpf: oldCpf } = req.params
          const { cpf, name, address, phone } = req.body
    
          const cpfAlreadyRegistrered = `SELECT * from costumer where cpf='${oldCpf}'`
          const cpfExists = await (await client.query(cpfAlreadyRegistrered)).rows[0]
          if (!cpfExists)
            return res.status(400).json({ message: 'O CPF informado não está cadastrado.' })
          const newCpfAlreadyRegistrered = `SELECT * from costumer where cpf='${cpf}'`
    
          if (oldCpf !== cpf) {
            const newCpfExists = await (await client.query(newCpfAlreadyRegistrered)).rows[0]
            if (newCpfExists) return res.status(400).json({ message: 'O novo CPF já está cadastrado como outro funcionario.' })
          }
    
          const updateEmployeeQuery = `update costumer SET cpf='${cpf}', name='${name}', phone='${phone}',address='${address}' WHERE cpf='${oldCpf}' `
          
          
          const costumer = await (await client.query(updateEmployeeQuery)).rows[0]
        
          return res.json(costumer)
        } catch (error) {
          return res.json(error)
        }
      })
}