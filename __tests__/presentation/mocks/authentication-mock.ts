import { AuthAnswer, Authentication, AuthParams } from "../../../src/domain/usecases/authentication";

export class DbAuthenticationSpy implements Authentication{
    auth(params: AuthParams): Promise<AuthAnswer> {
        return new Promise(resolve => resolve({accessToken: 'access_token', name: 'Ruan'}))
    }
    
}