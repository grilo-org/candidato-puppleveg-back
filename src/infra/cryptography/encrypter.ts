import { Encrypter } from "../../data/protocols/cryptography/encrypter";
import { sign, verify } from 'jsonwebtoken'
import { expiresIn} from '../helper/expiresIn'
import { Decrypter } from "../../data/protocols/cryptography/decrypter";

export class JWTAdapter implements Encrypter, Decrypter {
    decrypt(argument: string): string | null {
        const token = argument.replace('Bearer ', '')

        const teste = verify(token, process.env.JWT_SECRET!, (err, decode) => {
          if (err) return null
    
          return decode
        }) as any
    
        return teste?.id || null
    }
    encrypt(id: string): Promise<string> {
        return new Promise(resolve => resolve(sign({ id }, process.env.JWT_SECRET!, { expiresIn })))
    }
    
}