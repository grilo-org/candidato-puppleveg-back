export type AuthParams = {
    email: string,
    password: string
}
export type AuthAnswer = {
    accessToken?: string,
    name?: string,
    errorMessage?: string | undefined
}

export interface Authentication{
    auth(params: AuthParams): Promise<AuthAnswer>
}