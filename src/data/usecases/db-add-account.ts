import { AddAccount } from '../../domain/usecases/add-account'
import { Hasher } from '../protocols/cryptography/hasher'
import { AddAccountRepository } from '../protocols/db/add-account-repository'
import { loadAccountByEmailRepository } from '../protocols/db/load-account-by-email-repository'
import { LoadAccountByCpf } from '../protocols/db/load-account-by-cpf-repository'

export class DbAddAccount implements AddAccount {
  constructor (private readonly loadAccountByCpf: LoadAccountByCpf, private readonly loadAccountByEmail: loadAccountByEmailRepository, private readonly addAccountRepo: AddAccountRepository, private readonly hasher: Hasher) {
    this.addAccountRepo = addAccountRepo
    this.hasher = hasher
    this.loadAccountByEmail = loadAccountByEmail
  }

  async add (addAccountParams:Omit<AddAccount.Params, 'passwordConfirmation'>): Promise<{isValid: boolean, errorMessage?: string}> {
    const hashedPassword = await this.hasher.hash(addAccountParams.password)    
    const loadAccountByCpf = await this.loadAccountByCpf.loadAccountById(addAccountParams.cpf)
    const loadByEmail = await this.loadAccountByEmail.loadByEmail(addAccountParams.email) 
    if(loadByEmail) return {isValid: false, errorMessage: 'Email já cadastrado.'}
    if(loadAccountByCpf) return {isValid: false, errorMessage: 'Cpf já cadastrado.'}

    const addAccount = {
      cpf: addAccountParams.cpf,
      name: addAccountParams.name,
      email: addAccountParams.email,
      password: hashedPassword
    }
    const isValid = await this.addAccountRepo.add(addAccount)
    return {isValid: true}
  }
}