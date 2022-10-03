import { HasherComparer } from "../../../../src/data/protocols/cryptography/hasher-compare";

export class HasherSpy implements HasherComparer{
    compare(password: string, hashedPassword: string): Promise<boolean> {
        return new Promise(resolve => resolve(true))
    }
    
}