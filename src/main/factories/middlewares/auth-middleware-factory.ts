

import { DbValidateToken } from '../../../data/usecases/db-load-token'
import { JWTAdapter } from '../../../infra/cryptography/encrypter'
import { AccountPostgresRepository } from '../../../infra/db/postgres/account-postgres'
import { AuthMiddleware } from '../../../presentation/middlewares/auth-middleware'

export const authMiddlewareFactory = () => {
  const loadAccountByToken = new AccountPostgresRepository()
  const jwt = new JWTAdapter()
  const loadAccount = new DbValidateToken(jwt,loadAccountByToken)
  const controller = new AuthMiddleware(loadAccount)
  return controller
}