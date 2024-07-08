import { NAV_TABS } from './lib'
import { StyledNavBarWrapper, StyledNavLinkWrapper } from './NavBar.styled'
import { NavLink, ThemeToggler, ViewModeToggler } from './ui'

export const NavBar: React.FC = () => {
  return (
    <StyledNavBarWrapper direction='row'>
      <StyledNavLinkWrapper direction='row' spacing={2}>
        {NAV_TABS.map(({ to, label, getIcon }) => (
          <NavLink key={label} getIcon={getIcon} to={to} />
        ))}
      </StyledNavLinkWrapper>
      <ViewModeToggler />
      <ThemeToggler />
    </StyledNavBarWrapper>
  )
}
