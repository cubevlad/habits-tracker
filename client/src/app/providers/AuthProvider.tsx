import { useState, useEffect } from 'react'

import { AuthContextProvider } from '@shared/context'

export const AuthProvider = ({ children }: { children?: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('local-token')

    if (token) {
      setIsAuth(true)
    }
  }, [])

  return <AuthContextProvider value={{ isAuth, setIsAuth }}>{children}</AuthContextProvider>
}
