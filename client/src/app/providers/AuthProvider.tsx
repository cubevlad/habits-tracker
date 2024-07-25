import { useState, useEffect, useCallback, useMemo } from 'react'

import { AuthContextProvider } from '@shared/context'

export const AuthProvider = ({ children }: { children?: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('local-token')

    if (token) {
      setIsAuth(true)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem('local-token')

      if (!token) {
        setIsAuth(false)
      }

      // every 5 seconds check token within localStorage
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleLogout = useCallback(() => {
    localStorage.removeItem('local-token')
    setIsAuth(false)
  }, [])

  const handleLogin = useCallback(() => {
    setIsAuth(true)
  }, [])

  const contextValue = useMemo(
    () => ({
      isAuth,
      handleLogout,
      handleLogin,
    }),
    [isAuth, handleLogout, handleLogin]
  )

  return <AuthContextProvider value={contextValue}>{children}</AuthContextProvider>
}
