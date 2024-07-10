import { createCtx } from '@shared/lib'

interface AuthContext {
  isAuth: boolean
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>
}

export const [useAuthCtx, AuthContextProvider] = createCtx<AuthContext>()
