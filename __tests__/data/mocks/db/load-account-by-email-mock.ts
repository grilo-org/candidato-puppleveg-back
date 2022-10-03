
import { loadAccountByEmailRepository } from "../../../../src/data/protocols/db/load-account-by-email-repository";
import { Account } from "../../../../src/domain/entities/account";


export class LoadAccountByEmailSpy implements loadAccountByEmailRepository{
    loadByEmail(email: string): Promise<Account | null> {
        return new Promise(resolve => resolve({password: 'hashed_password', cpf: '14789524663', email, name: 'Ruan'} ))
    }
   
}