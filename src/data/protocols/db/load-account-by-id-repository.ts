import { Account } from '../../../domain/entities/account'

export interface LoadAccountById{
    loadAccountById(userCpf: string): Promise<Account>
}