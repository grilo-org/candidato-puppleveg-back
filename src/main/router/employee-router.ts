import { Request, Router, Response } from 'express'
import client from '../../infra/db/postgres/client'
import { auth } from '../middlewares/auth'



export const employeeRoute = (router: Router) => {

  router.get('/employees', auth,async (req: Request, res: Response) => {
    try {
      const query = `select * from employee`
      const employess = (await client.query(query)).rows
      
      return res.send(employess)
    }
    catch (error) {
      return res.status(500).json('Server Error.')
    }
  })

  router.post('/employees', auth,async (req: Request, res: Response) => {
    try {
      const { cpf, name, phone, profession, salary } = req.body
      const cpfAlreadyRegistrered = `SELECT * from Employee where cpf='${cpf}'`
      const cpfExists = await (await client.query(cpfAlreadyRegistrered)).rows[0]
      if (cpfExists) {
        return res.status(400).json({ message: 'Um funcionario com esse cpf já existe' })
      }
      const insertEmployee = `insert into employee values ('${cpf}','${name}','${phone}','${salary}','${profession}')`
      console.log(insertEmployee);
      
      await client.query(insertEmployee)
      return res.json({ status: 'Criado com sucesso.' })
    } catch (error) {
      return res.status(500).json(error)
    }
  })

  router.get('/employees/:cpf', async (req: Request, res: Response) => {
    try {
      const { cpf } = req.params
      
      const cpfAlreadyRegistrered = `SELECT * from Employee where cpf='${cpf}'`
      const cpfExists = await (await client.query(cpfAlreadyRegistrered)).rows[0]
      if (!cpfExists) {
        return res.status(400).json({ message: 'O CPF informado não está cadastrado.' })
      }
      const insertEmployeeQuery = `select * from employee where cpf='${cpf}'`
      const employee = await (await client.query(insertEmployeeQuery)).rows[0]
      return res.json(employee)
    } catch (error) {
      return res.status(500).json(error)
    }
  })

  router.delete('/employees/:cpf', async (req: Request, res: Response) => {
    try {
      const { cpf } = req.params
      

      const cpfAlreadyRegistrered = `SELECT * from Employee where cpf='${cpf}'`
      const cpfExists = await (await client.query(cpfAlreadyRegistrered)).rows[0]
      if (!cpfExists) {
        return res.status(400).json({ message: 'O CPF informado não existe' })
      }
      const deleteEmployeeQuery = `delete from employee where cpf='${cpf}'`
      await client.query(deleteEmployeeQuery)
      return res.json({ status: 'Funcionario deletado com sucesso.' })
    } catch (error) {
      return res.status(500).json(error)
    }
  })
  router.put('/employees/:cpf', async (req: Request, res: Response) => {
    try {
      const { cpf: oldCpf } = req.params
      const { cpf, name, phone, profession, salary } = req.body
    
      const cpfAlreadyRegistrered = `SELECT * from Employee where cpf='${oldCpf}'`
      const cpfExists = await (await client.query(cpfAlreadyRegistrered)).rows[0]
      if (!cpfExists)
        return res.status(400).json({ message: 'O CPF informado não está cadastrado.' })

      const newCpfAlreadyRegistrered = `SELECT * from Employee where cpf='${cpf}'`

      if (oldCpf !== cpf) {
        (oldCpf == cpf);
  
        
        const newCpfExists = await (await client.query(newCpfAlreadyRegistrered)).rows[0]
        if (newCpfExists) return res.status(400).json({ message: 'O novo CPF já está cadastrado como outro funcionario.' })
      }

      const updateEmployeeQuery = `update Employee SET cpf='${cpf}', name='${name}', phone='${phone}',profession='${profession}', salary=${salary} WHERE cpf='${oldCpf}' `
      const employee = await (await client.query(updateEmployeeQuery)).rows[0]
      return res.json(employee)
    } catch (error) {
      return res.status(500).json(error)
    }
  })
  

}
