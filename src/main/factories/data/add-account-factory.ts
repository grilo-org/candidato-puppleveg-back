
import { DbAddAccount } from '../../../data/usecases/db-add-account'
import { BCryptAdapter } from '../../../infra/cryptography/hasher'
import { AccountPostgresRepository } from '../../../infra/db/postgres/account-postgres'


export const addAccountFactory = () => {
  const addAccount = new AccountPostgresRepository()
  const hasher = new BCryptAdapter()
  const dbLoadAccountByEmail = new  AccountPostgresRepository()
  const usecase = new DbAddAccount(dbLoadAccountByEmail,dbLoadAccountByEmail,addAccount, hasher)

  return usecase
}