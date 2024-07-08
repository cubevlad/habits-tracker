import { Stack, Box } from '@mui/material'
import styled from 'styled-components'

export const StyledWrapper = styled(Stack)`
  overflow: auto;
  min-height: 100vh;

  & > * {
    padding: 20px;
  }
`

export const StyledContent = styled(Box)`
  display: flex;
  justify-content: center;
  flex: 1 1 auto;
`
