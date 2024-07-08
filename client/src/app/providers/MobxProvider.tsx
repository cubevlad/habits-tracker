import { RootStoreProvider } from '@shared/context'
import { rootStore } from '@shared/store'

export const MobxProvider = ({ children }: { children?: React.ReactNode }) => {
  return <RootStoreProvider value={rootStore}>{children}</RootStoreProvider>
}
