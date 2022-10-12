import { AuthAnswer, Authentication, AuthParams } from "../../domain/usecases/authentication";
import { Encrypter } from "../protocols/cryptography/encrypter";
import { HasherComparer } from "../protocols/cryptography/hasher-compare";
import { loadAccountByEmailRepository } from "../protocols/db/load-account-by-email-repository";
import { UpdateAccessTokenRepository } from "../protocols/db/update-access-token-repository";


export class DbAuthentication implements Authentication {

    constructor(private readonly loadAccountByEmailRepository: loadAccountByEmailRepository, private readonly hasher: HasherComparer, private readonly encrypt: Encrypter, private readonly updateAccessTokenRepository: UpdateAccessTokenRepository) {
        this.loadAccountByEmailRepository = loadAccountByEmailRepository
        this.hasher = hasher
        this.encrypt = encrypt
        this.updateAccessTokenRepository = updateAccessTokenRepository
    }

    async auth(params: AuthParams): Promise<AuthAnswer> {
        const account = await this.loadAccountByEmailRepository.loadByEmail(params.email)
        if (account !== null) {
           const isValid =  await this.hasher.compare(params.password, account.password)
           if(!isValid) return { errorMessage: "Senha inválida."}
           const accessToken = await this.encrypt.encrypt(account.cpf)  
           await this.updateAccessTokenRepository.updateAccessToken(account.cpf,accessToken)
           return {
            accessToken: accessToken,
            name: account.name,
            errorMessage: undefined
           }
        }

        return {
            errorMessage: "O email não está cadastrado."
        }
    }

}