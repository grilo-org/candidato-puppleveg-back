import { DbAuthentication } from "../../../src/data/usecases/db-authentication"
import { LoadAccountByEmailSpy } from "../mocks/db/load-account-by-email-mock"
import { faker } from '@faker-js/faker'
import { Account } from "../../../src/domain/entities/account"
import { AuthAnswer, AuthParams } from "../../../src/domain/usecases/authentication"
import { HasherSpy } from "../mocks/cryptography/hasher-comparer"
import { EncrypterSpy } from "../mocks/cryptography/encrypter-spy"
import { UpdateAccessTokenRepositorySpy } from "../mocks/db/update-access-token-repository"

const makeSut  = () => {
    const loadAccountByEmail = new LoadAccountByEmailSpy()
    const hasher = new HasherSpy()
    const encrypter = new EncrypterSpy()
    const updateAccessTokenRepository = new UpdateAccessTokenRepositorySpy()
    const sut = new DbAuthentication(loadAccountByEmail, hasher, encrypter, updateAccessTokenRepository)
    return { sut, loadAccountByEmail, hasher, encrypter, updateAccessTokenRepository}
}

describe('Db Authentication', () => {
    test('should call load account by email with correct params', async () => {
        const {sut, loadAccountByEmail} = makeSut()
        const params = jest.spyOn(loadAccountByEmail, 'loadByEmail')
        const fakeAuthParams = {
            email: faker.internet.email(),
            password: faker.internet.password()
        }
        await sut.auth(fakeAuthParams)
        expect(params).toBeCalledWith(fakeAuthParams.email)
    })
    test('should return an error if no account is found', async () => {
        const {sut, loadAccountByEmail} = makeSut()
        jest.spyOn(loadAccountByEmail, 'loadByEmail').mockImplementationOnce(() => new Promise(resolve => resolve(null)))
        const fakeAuthParams = {
            email: faker.internet.email(),
            password: faker.internet.password()
        }
        const res = await sut.auth(fakeAuthParams)
        expect(res).toEqual({errorMessage: "O email não está cadastrado."})
    })
    test('should throws if load account by email throws ', async () => {
        const {sut, loadAccountByEmail} = makeSut()
        jest.spyOn(loadAccountByEmail, 'loadByEmail').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
        const fakeAuthParams = {
            email: faker.internet.email(),
            password: faker.internet.password()
        }
        const promise = sut.auth(fakeAuthParams)
        await expect(promise).rejects.toThrow()
    })
    

    test('should call hasher comparer with correct params', async () => {
        const {sut, hasher } = makeSut()
        const compareSpy = jest.spyOn(hasher, 'compare')
        const fakeAuthParams = {
            email: faker.internet.email(),
            password: faker.internet.password()
        }
        await sut.auth(fakeAuthParams)
        expect(compareSpy).toHaveBeenCalledWith(fakeAuthParams.password, 'hashed_password')
    })
  
    test('should return an error if hasher comparer return false', async () => {
        const {sut, hasher } = makeSut()
        jest.spyOn(hasher, 'compare').mockReturnValueOnce(new Promise(resolve => resolve(false)))
        const fakeAuthParams = {
            email: faker.internet.email(),
            password: faker.internet.password()
        }
        const res = await sut.auth(fakeAuthParams)
        expect(res).toEqual({errorMessage: "Senha inválida."})
    })

    test('should throws if hasher comparer throws ', async () => {
        const {sut, hasher} = makeSut()
        jest.spyOn(hasher, 'compare').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
        const fakeAuthParams = {
            email: faker.internet.email(),
            password: faker.internet.password()
        }
        const promise = sut.auth(fakeAuthParams)
        await expect(promise).rejects.toThrow()
    })

    test('should call encrypter with correct params', async () => {
        const {sut, encrypter } = makeSut()
        const EncrypterSpy = jest.spyOn(encrypter, 'encrypt')
        const fakeAuthParams = {
            email: faker.internet.email(),
            password: faker.internet.password()
        }
        const account = await sut.auth(fakeAuthParams)
        expect(EncrypterSpy).toHaveBeenCalledWith('14789524663')
    })
    test('should thrown if encrypter throws params', async () => {
        const {sut, encrypter } = makeSut()
        jest.spyOn(encrypter, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
        const fakeAuthParams = {
            email: faker.internet.email(),
            password: faker.internet.password()
        }
        const promise = sut.auth(fakeAuthParams)
        await expect(promise).rejects.toThrow()
    })
    test('should call update access token repositry with correct params', async () => {
        const {sut, updateAccessTokenRepository } = makeSut()
        const updateAccessTokenSpy = jest.spyOn(updateAccessTokenRepository, 'updateAccessToken')
        const fakeAuthParams = {
            email: faker.internet.email(),
            password: faker.internet.password()
        }
        await sut.auth(fakeAuthParams)
        expect(updateAccessTokenSpy).toHaveBeenCalledWith('14789524663','encrypted_cpf')
    })
    test('should thrown if update access token repositry throws params', async () => {
        const {sut, updateAccessTokenRepository } = makeSut()
        jest.spyOn(updateAccessTokenRepository, 'updateAccessToken').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
        const fakeAuthParams = {
            email: faker.internet.email(),
            password: faker.internet.password()
        }
        const promise = sut.auth(fakeAuthParams)
        await expect(promise).rejects.toThrow()
    })
    test('should return an accessToken and accout name if everything works', async () => {
        const {sut} = makeSut()
        const fakeAuthParams = {
            email: faker.internet.email(),
            password: faker.internet.password()
        }
        const res = await sut.auth(fakeAuthParams)
        expect(res).toEqual({accessToken: 'encrypted_cpf', name: 'Ruan'})
    })

})