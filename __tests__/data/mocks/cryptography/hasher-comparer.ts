import { Hasher } from "../../../../src/data/protocols/cryptography/hasher";

export class HasherSpy implements Hasher{
    compare(password: string, hashedPassword: string): Promise<boolean> {
        return new Promise(resolve => resolve(true))
    }
    
}