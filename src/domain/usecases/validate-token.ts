import { Account } from '../entities/account'

export interface ValidateToken{
    loadAccountByToken(accessToken: string): Promise<Account | null>
}