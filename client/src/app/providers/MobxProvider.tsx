import { api } from '@shared/api'
import { RootStoreProvider } from '@shared/context'
import { RootStore } from '@shared/store'

export const MobxProvider = ({ children }: { children?: React.ReactNode }) => {
  const store = new RootStore(api)

  return <RootStoreProvider value={store}>{children}</RootStoreProvider>
}
