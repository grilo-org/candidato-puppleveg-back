import { UpdateAccessTokenRepository } from '../../../../src/data/protocols/db/update-access-token-repository'
export class UpdateAccessTokenRepositorySpy implements UpdateAccessTokenRepository{
    updateAccessToken(cpf: string, accessToken: string): Promise<void> {
        return new Promise(resolve => resolve())
    }

}