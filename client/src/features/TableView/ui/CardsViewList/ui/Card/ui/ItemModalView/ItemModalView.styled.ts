import { Box, Button } from '@mui/material'
import styled from 'styled-components'

export const StyledItemModalViewWrapper = styled(Box)`
  min-width: 400px;
  min-height: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
