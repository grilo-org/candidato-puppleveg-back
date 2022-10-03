export class PasswordConfirmationError extends Error {
    constructor () {
      super()
      super.name = 'As senhas não são iguais.'
    }
  }