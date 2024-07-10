import { Box, Button, Stack, Typography } from '@mui/material'
import styled from 'styled-components'

export const StyledLoginWrapper = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 520px;
  min-width: 320px;
`

export const StyledTitle = styled(Typography)`
  margin-bottom: 20px;
`

export const StyledLoginForm = styled(Stack)`
  padding: 40px;
  border: 1px solid ${({ theme }) => theme.palette.primary};
  border-radius: 8px;
  width: 100%;
`

export const StyledLoginSumbitButton = styled(Button)`
  background-color: ${({ theme }) => theme.palette.primary};
  color: ${({ theme }) => theme.palette.text};

  &.Mui-disabled {
    background-color: ${({ theme }) => theme.palette.gray};
  }
`
