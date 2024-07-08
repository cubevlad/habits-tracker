type Route = {
  caption: string
  element: React.ReactNode
  to: string
  visible?: boolean
}

type Routes = Route[]

export type { Route, Routes }
