export interface AddAccount {
    add(addAccountParams: Omit<AddAccount.Params, 'passwordConfirmation'>): Promise<{isValid: boolean, errorMessage?: string}>
}


export namespace AddAccount{
    export type Params = {
        name: string
        email: string
        cpf: string
        password: string
        passwordConfirmation: string
    }
}