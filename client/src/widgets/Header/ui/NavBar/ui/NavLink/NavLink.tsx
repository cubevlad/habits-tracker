import { NavLink as RouteNavigationLink } from 'react-router-dom'

import { useThemeCtx } from '@shared/context'

import { useLinkState } from './lib'

import type { LinksMapValue } from '../../model'

type NavLinkProps = {
  to: LinksMapValue
  getIcon: (buttonState: number) => React.ReactNode
  isDisabled?: boolean
}

export const NavLink: React.FC<NavLinkProps> = ({ to, getIcon, isDisabled }) => {
  const { mode } = useThemeCtx()

  const linkState = useLinkState({
    isDisabled: isDisabled ?? false,
    mode,
    to,
  })

  const icon = getIcon(linkState)

  return <RouteNavigationLink to={to}>{icon}</RouteNavigationLink>
}
