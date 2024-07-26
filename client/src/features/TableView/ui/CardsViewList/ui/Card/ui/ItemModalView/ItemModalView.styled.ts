import { Box, Button } from '@mui/material'
import styled from 'styled-components'

export const StyledItemModalViewWrapper = styled(Box)`
  background-color: ${({ theme }) => theme.palette.background.paper};
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
`

export const StyledFormButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
`
