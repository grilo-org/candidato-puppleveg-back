import { LoginController } from "../../../presentation/controllers/login/login-controller"
import { authenticationFactory } from "../data/authentication-factory"

export const loginControllerFactory = () => {
  const authentication = authenticationFactory()
  const controller = new LoginController(authentication)
  return controller
}