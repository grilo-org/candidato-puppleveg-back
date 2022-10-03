import { Account } from '../../../domain/entities/account'

export interface LoadAccountByCpf{
    loadAccountById(userCpf: string): Promise<Account>
}