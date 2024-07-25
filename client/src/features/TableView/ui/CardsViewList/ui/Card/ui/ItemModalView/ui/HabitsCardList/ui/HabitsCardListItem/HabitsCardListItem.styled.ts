import { Stack } from '@mui/material'
import styled from 'styled-components'

import { ACHIEVED_COLOR } from '@shared/constants'

export const StyledHabitsCardListItem = styled(Stack)<{ $achieved?: boolean }>`
  border: ${({ theme }) => `1px solid ${theme.palette.divider}`};
  background-color: ${({ $achieved, theme }) =>
    $achieved ? ACHIEVED_COLOR : theme.palette.background.default};
  border-radius: 8px;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  height: 40px;
  padding: 0 0.5rem;

  &:hover {
    border: ${({ theme }) => `1px solid ${theme.palette.primary.main}`};
  }
`

export const StyledIconsWrapper = styled(Stack)`
  height: 100%;
  align-items: center;
  justify-content: center;

  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 0 0.5rem;

    & > svg {
      color: ${({ theme }) => theme.palette.text.secondary};
      font-size: 1rem;
    }
  }

  & > div:hover {
    & > svg {
      color: ${({ theme }) => theme.palette.primary.main};
    }
  }
`
