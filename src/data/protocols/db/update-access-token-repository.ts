export interface UpdateAccessTokenRepository{
    updateAccessToken(cpf: string, accessToken: string): Promise<void>
}