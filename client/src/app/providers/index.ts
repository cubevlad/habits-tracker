import { composeProviders } from '@shared/lib'

import { MobxProvider } from './MobxProvider'
import { WithQueryClientProvider } from './QueryClientProvider'
import { WithBrowserRouter } from './RouterProvider'
import { ThemeProvider } from './ThemeProvider'
import { ViewModeProvider } from './ViewModeProvider'

const AppProvider = composeProviders([
  WithQueryClientProvider,
  MobxProvider,
  ThemeProvider,
  WithBrowserRouter,
  ViewModeProvider,
])

export { AppProvider }
