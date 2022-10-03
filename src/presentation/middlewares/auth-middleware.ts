import { ValidateToken } from "../../domain/usecases/validate-token"
import { InvalidTokenError } from "../errors/invalid-token-error"
import { MissingParamError } from "../errors/missing-param-error"
import { forbbiden, ok, serverError } from "../helpers/http-helpers"
import { HttpResponse } from "../protocols/http-response"
import { Middleware } from "../protocols/middleware"


export class AuthMiddleware implements Middleware {
  constructor (private readonly loadAccountByToken: ValidateToken) {
    this.loadAccountByToken = loadAccountByToken
  }

  async handle ({ authorization }: any): Promise<HttpResponse> {
    try {
      if (authorization === undefined) return forbbiden(new MissingParamError('authorization'))

      const account = await this.loadAccountByToken.loadAccountByToken(authorization)

      if (account === null) return forbbiden(new InvalidTokenError())
      return ok({ account })
    } catch (error) {
      return serverError()
    }
  }
}