import { faker } from "@faker-js/faker";
import { LoginController } from "../../../src/presentation/controllers/login-controller";
import { InvalidParamsError } from "../../../src/presentation/errors/invalid-params";
import { ServerError } from "../../../src/presentation/errors/server-errors";
import { DbAuthenticationSpy } from "../mocks/authentication-mock";

const makeSut = () => {
    const authentication = new DbAuthenticationSpy()
    const sut = new LoginController(authentication)
    return { sut, authentication}
}

describe('Login Controller', () => {
    test('should call authentication with correct params', async () => {
        const { sut, authentication} = makeSut()
        const authenticationSpy = jest.spyOn(authentication,'auth')
        const fakeAccount = {
            email: faker.internet.email(),
            password: faker.internet.password()
        }
        await sut.handle(fakeAccount)
        expect(authenticationSpy).toBeCalledWith(fakeAccount)
    })
    test('should return 400 if authetincation fails', async () => {
        const { sut, authentication} = makeSut()
        jest.spyOn(authentication,'auth').mockReturnValueOnce(new Promise( resolve => resolve({errorMessage: 'erro'}) ))
        const fakeAccount = {
            email: faker.internet.email(),
            password: faker.internet.password()
        }
        const res = await sut.handle(fakeAccount)
        expect(res.statusCode).toBe(400)
    })
    test('should return 400 and expected error message if authetincation fails', async () => {
        const { sut, authentication} = makeSut()
        jest.spyOn(authentication,'auth').mockReturnValueOnce(new Promise( resolve => resolve({errorMessage: 'erro'}) ))
        const fakeAccount = {
            email: faker.internet.email(),
            password: faker.internet.password()
        }
        const res = await sut.handle(fakeAccount)
        expect(res.body).toEqual(new InvalidParamsError('erro'))
    })
    test('should return 400 and expected error message if authetincation fails', async () => {
        const { sut, authentication} = makeSut()
        jest.spyOn(authentication,'auth').mockReturnValueOnce(new Promise( resolve => resolve({errorMessage: 'erro'}) ))
        const fakeAccount = {
            email: faker.internet.email(),
            password: faker.internet.password()
        }
        const res = await sut.handle(fakeAccount)
        expect(res.body).toEqual(new InvalidParamsError('erro'))
    })
    test('should return 500 if server error', async () => {
        const { sut, authentication} = makeSut()
        jest.spyOn(authentication,'auth').mockReturnValueOnce(new Promise( (resolve, reject )=> reject(new Error()) ))
        const fakeAccount = {
            email: faker.internet.email(),
            password: faker.internet.password()
        }
        const res = await sut.handle(fakeAccount)
        expect(res.body).toEqual(new ServerError('Erro de servidor.'))
    })
    test('should return 200 if success', async () => {
        const { sut } = makeSut()
        const fakeAccount = {
            email: faker.internet.email(),
            password: faker.internet.password()
        }
        const res = await sut.handle(fakeAccount)
        expect(res.statusCode).toBe(200)
    })
});