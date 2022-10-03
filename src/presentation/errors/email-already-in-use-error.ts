
export class LabelAlreadyInUse extends Error {
    constructor (msg: string) {
      super(msg)
      super.name = msg
    }
  }