import { NavLink as RouteNavigationLink } from 'react-router-dom'

import { useAuthCtx, useThemeCtx } from '@shared/context'

import { useLinkState } from './lib'

import type { LinksMapValue } from '../../model'

type NavLinkProps = {
  to: LinksMapValue
  getIcon: (buttonState: number) => React.ReactNode
  isDisabled?: boolean
}

export const NavLink: React.FC<NavLinkProps> = ({ to, getIcon, isDisabled }) => {
  const { mode } = useThemeCtx()
  const { handleLogout } = useAuthCtx()

  const linkState = useLinkState({
    isDisabled: isDisabled ?? false,
    mode,
    to,
  })

  const icon = getIcon(linkState)

  const handleClick = () => {
    if (isDisabled) {
      return
    }

    if (to === '/logout') {
      handleLogout()
    }
  }

  return (
    <RouteNavigationLink to={to} onClick={handleClick}>
      {icon}
    </RouteNavigationLink>
  )
}
