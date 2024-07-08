import { createContext, useContext } from 'react'

export const createCtx = <ContextType>() => {
  const ctx = createContext<ContextType | undefined>(undefined)

  const useCtx = () => {
    const context = useContext(ctx)

    if (context === undefined) {
      throw new Error('useCtx must be inside a Provider with a value')
    }

    return context
  }

  return [useCtx, ctx.Provider] as const
}
