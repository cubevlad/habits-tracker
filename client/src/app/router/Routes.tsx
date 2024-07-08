import { Suspense } from 'react'

import { Route, Routes as ReactRoutes } from 'react-router-dom'

import { AppLayout } from '@app/AppLayout'
import { HomePage } from '@pages'

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
  return (
    <AppLayout>
      <Suspense fallback='Loading...'>
        <ReactRoutes>
          {routes.map(({ caption, element, to }) => (
            <Route key={caption} element={element} path={to} />
          ))}
        </ReactRoutes>
      </Suspense>
    </AppLayout>
  )
}

export { Routes }
