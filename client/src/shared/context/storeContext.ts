import { createCtx } from '@shared/lib'
import type { rootStore } from '@shared/store'

type RootStore = typeof rootStore

export const [useStore, RootStoreProvider] = createCtx<RootStore>()
