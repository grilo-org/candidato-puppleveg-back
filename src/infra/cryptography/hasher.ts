import { Hasher } from "../../data/protocols/cryptography/hasher";
import {compare} from 'bcrypt'
export class BCryptAdapter implements Hasher{
    async compare(password: string, hashedPassword: string): Promise<boolean> {
        const isValid = await compare(password, hashedPassword)
        return isValid
    }
}