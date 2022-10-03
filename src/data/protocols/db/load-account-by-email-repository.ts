import { Account } from "../../../domain/entities/account";

export interface loadAccountByEmailRepository{
    loadByEmail(email: string): Promise<Account | null>
}