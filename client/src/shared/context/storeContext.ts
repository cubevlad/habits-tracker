import { createCtx } from '@shared/lib'
import type { RootStore } from '@shared/store'

export const [useStore, RootStoreProvider] = createCtx<RootStore>()
