export class MissingParamError extends Error{
    constructor(msg: string){
        super()
        this.message = msg
    }
}