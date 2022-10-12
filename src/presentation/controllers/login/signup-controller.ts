import { AddAccount } from "../../../domain/usecases/add-account"
import { LabelAlreadyInUse } from "../../errors/email-already-in-use-error"
import { MissingParamError } from "../../errors/missing-param-error"
import { PasswordConfirmationError } from "../../errors/password-confirmation-error"
import { badRequest, forbbiden, ok, serverError } from "../../helpers/http-helpers"
import { Controller } from "../../protocols/controller"
import { HttpRequest } from "../../protocols/http-request"
import { HttpResponse } from "../../protocols/http-response"


export class SignUpController implements Controller {
  constructor (private readonly addAccount: AddAccount) {
    this.addAccount = addAccount
  }

  async handle (request: HttpRequest<AddAccount.Params>): Promise<HttpResponse> {
    const {email, name, password, passwordConfirmation, cpf}: AddAccount.Params = request.body  
    try{
      if (password !== passwordConfirmation) return badRequest(new PasswordConfirmationError())
      const {isValid, errorMessage} = await this.addAccount.add({ email, password, name, cpf })
      if (!isValid) return badRequest(new LabelAlreadyInUse(errorMessage!))
      return ok({ email, password, name })
    } catch(error){
      (error);
      
      return serverError()
    }
  }
}