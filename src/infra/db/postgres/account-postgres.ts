import { loadAccountByEmailRepository } from "../../../data/protocols/db/load-account-by-email-repository";
import { UpdateAccessTokenRepository } from "../../../data/protocols/db/update-access-token-repository";
import { Account } from "../../../domain/entities/account";
import { Pool } from 'pg'
import dayjs from 'dayjs'
import client from "./client";
import { LoadAccountByCpf } from "../../../data/protocols/db/load-account-by-cpf-repository";
import { AddAccountRepository } from "../../../data/protocols/db/add-account-repository";
import { AddAccount } from "../../../domain/usecases/add-account";
export class AccountPostgresRepository implements loadAccountByEmailRepository, UpdateAccessTokenRepository, LoadAccountByCpf, AddAccountRepository{
    client: Pool
    constructor(){
        this.client = client
    }
    async add(addAccountParams: Omit<AddAccount.Params, "passwordConfirmation">): Promise<boolean> {
        const query = `INSERT INTO USERS VALUES ('${addAccountParams.cpf}','${addAccountParams.name}','${addAccountParams.email}','${addAccountParams.password}')`
        await this.client.query(query)
        
        
        return true
    }
    async loadAccountById(userCpf: string): Promise<Account> {
        const query = `SELECT * FROM Users WHERE cpf='${userCpf}'`
        const account = (await this.client.query(query)).rows[0]
        return account
    }
    
    async updateAccessToken(cpf: string, accessToken: string): Promise<void> {
        const expiresIn = dayjs().add(15, 'second').unix()
        let findToken = await this.client.query(`SELECT * FROM ACCESSTOKEN WHERE USERCPF='${cpf}'`)
       
        
        if(!findToken.rows[0]){
            findToken = await this.client.query(`INSERT INTO ACCESSTOKEN VALUES ('${accessToken}',${expiresIn},'${cpf}')`)
        } else{
            await this.client.query(`UPDATE ACCESSTOKEN SET ID='${accessToken}' WHERE USERCPF = '${cpf}'`)
        }
    }
    async loadByEmail(email: string): Promise<Account | null> {  
       
        const query = `SELECT * FROM USERS WHERE EMAIL='${email}'`
        const account = (await this.client.query(query)).rows[0]
        
        if(!account) return null
        
        return account
    }
    
} 