import { composeProviders } from '@shared/lib'

import { AuthProvider } from './AuthProvider'
import { MobxProvider } from './MobxProvider'
import { WithQueryClientProvider } from './QueryClientProvider'
import { WithBrowserRouter } from './RouterProvider'
import { ThemeProvider } from './ThemeProvider'
import { ViewModeProvider } from './ViewModeProvider'

const AppProvider = composeProviders([
  WithQueryClientProvider,
  AuthProvider,
  MobxProvider,
  ThemeProvider,
  WithBrowserRouter,
  ViewModeProvider,
])

export { AppProvider }
