import { HasherComparer } from "../../data/protocols/cryptography/hasher-compare";
import bcrypt from 'bcrypt'
import { Hasher } from "../../data/protocols/cryptography/hasher";
export class BCryptAdapter implements HasherComparer, Hasher{
    async hash(hash: string): Promise<string> {
        const hashed = await bcrypt.hash(hash, 12)
        return hashed
    }
    async compare(password: string, hashedPassword: string): Promise<boolean> {
        const isValid = await bcrypt.compare(password, hashedPassword)        
       
        return isValid
    }
}