import { Suspense } from 'react'

import { Route, Routes as ReactRoutes, Navigate } from 'react-router-dom'

import { AppLayout } from '@app/AppLayout'
import { HomePage, LoginPage, SignUpPage } from '@pages'
import { useAuthCtx } from '@shared/context'

import { APP_LINKS } from './constants'
import type { Routes as RoutesType } from './types'

const routes: RoutesType = [
  {
    to: APP_LINKS.HOME,
    element: <HomePage />,
    caption: 'HomePage',
  },
]

const Routes = () => {
  const { isAuth } = useAuthCtx()

  return (
    <AppLayout>
      <Suspense fallback='Loading...'>
        {isAuth ? (
          <ReactRoutes>
            {routes.map(({ caption, element, to }) => (
              <Route key={caption} element={element} path={to} />
            ))}
            <Route element={<Navigate replace to='/' />} path='*' />
          </ReactRoutes>
        ) : (
          <ReactRoutes>
            <Route element={<LoginPage />} path={APP_LINKS.LOGIN} />
            <Route element={<SignUpPage />} path={APP_LINKS.SIGNUP} />
            <Route element={<Navigate replace to='/login' />} path='*' />
          </ReactRoutes>
        )}
      </Suspense>
    </AppLayout>
  )
}

export { Routes }
