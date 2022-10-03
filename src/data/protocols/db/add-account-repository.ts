import { AddAccount } from "../../../domain/usecases/add-account";

export interface AddAccountRepository{
    add(addAccountParams:Omit<AddAccount.Params, 'passwordConfirmation'>): Promise<boolean>
}