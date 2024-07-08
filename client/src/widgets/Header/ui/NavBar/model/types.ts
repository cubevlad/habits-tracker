import type { APP_LINKS } from '@app/router/constants'

export type LinksMap = typeof APP_LINKS
export type LinksMapKey = keyof LinksMap
export type LinksMapValue = LinksMap[LinksMapKey]

export type NavTabsType = {
  to: LinksMapValue
  label: LinksMapKey
  getIcon: (buttonState: number) => React.ReactNode
}
