import { Authentication } from "../../../domain/usecases/authentication"
import { InvalidParamsError } from "../../errors/invalid-params"
import { badRequest, ok, serverError, unauthorized } from "../../helpers/http-helpers"
import { Controller } from "../../protocols/controller"
import { HttpResponse } from "../../protocols/http-response"


export class LoginController implements Controller{
    constructor(private readonly authentication: Authentication){
        this.authentication = authentication
    }
    async handle(request: LoginController.Request): Promise<HttpResponse> {
        try{
            const res = await this.authentication.auth(request.body)
            if(res.errorMessage){
                return unauthorized(new InvalidParamsError(res.errorMessage))
            }        
            return ok(res)     
        }catch(error){
            return serverError()
        }
    }
    
}

export namespace LoginController {
    export type Request = {
      body: {
        email: string
        password: string
      }
    }
}