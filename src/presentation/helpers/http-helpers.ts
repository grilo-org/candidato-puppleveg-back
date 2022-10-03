import { ServerError } from "../errors/server-errors"

export const badRequest = (error: Error) => ({ 
    statusCode: 400,
    body: error
})

export const ok = (body: any) => ({ 
    statusCode: 200,
    body
})

export const serverError = () => ({
    statusCode: 500,
    body: new ServerError('Erro de servidor.')
})

export const forbbiden = (error: Error) => {
    return {
      statusCode: 403,
      body: error
    }
}