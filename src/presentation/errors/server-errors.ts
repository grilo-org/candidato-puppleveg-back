export class ServerError extends Error{
    constructor(msg: string){
        super()
        this.message = msg
    }
}