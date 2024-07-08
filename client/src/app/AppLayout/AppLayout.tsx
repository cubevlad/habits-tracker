import { Footer } from '@widgets/Footer'
import { Header } from '@widgets/Header'

import { StyledContent, StyledWrapper } from './AppLayout.styled'

type AppLayoutProps = {
  children?: React.ReactNode
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <StyledWrapper>
      <Header />
      <StyledContent>{children}</StyledContent>
      <Footer />
    </StyledWrapper>
  )
}
