export interface HttpRequest<T = any>{
    headers?: any
    body: T
}