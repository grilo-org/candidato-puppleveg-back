import { DbAuthentication } from "../../../data/usecases/db-authentication"
import { JWTAdapter } from "../../../infra/cryptography/encrypter"
import { BCryptAdapter } from "../../../infra/cryptography/hasher"
import { AccountPostgresRepository } from "../../../infra/db/postgres/account-postgres"

export const authenticationFactory = (): DbAuthentication => {
  const dbLoadAccessToken = new  AccountPostgresRepository()
  const hasherCompare = new BCryptAdapter()
  const encrypter =  new JWTAdapter()
  const authentication = new DbAuthentication(dbLoadAccessToken, hasherCompare, encrypter, dbLoadAccessToken)
  return authentication
}