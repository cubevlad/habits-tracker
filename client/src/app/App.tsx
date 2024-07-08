import { AppProvider } from './providers'
import { Routes } from './router'

export const App = () => {
  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  )
}
