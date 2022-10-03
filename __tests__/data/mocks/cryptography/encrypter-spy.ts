import { Encrypter } from "../../../../src/data/protocols/cryptography/encrypter";

export class EncrypterSpy implements Encrypter{
    encrypt(id: string): Promise<string> {
        return new Promise(resolve => resolve('encrypted_cpf'))
    }
    
}