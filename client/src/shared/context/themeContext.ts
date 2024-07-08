import { createCtx } from '@shared/lib'

type ThemeContextProviderProps = {
  handleToggleColorMode: VoidFunction
  mode: 'dark' | 'light'
}

export const [useThemeCtx, ThemeContextProvider] = createCtx<ThemeContextProviderProps>()
