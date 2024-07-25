import { createCtx } from '@shared/lib'

interface AuthContext {
  isAuth: boolean
  handleLogout: VoidFunction
  handleLogin: VoidFunction
}

export const [useAuthCtx, AuthContextProvider] = createCtx<AuthContext>()
