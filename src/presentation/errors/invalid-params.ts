export class InvalidParamsError extends Error{
    constructor(msg: string){
        super()
        this.message = msg
    }
}