export class InvalidTokenError extends Error {
    constructor () {
      super('Invalid Token')
      super.name = 'Invalid Access Token Error'
    }
  }