import { Stack } from '@mui/material'
import styled from 'styled-components'

export const StyledNoteListItem = styled.div`
  border: 1px solid ${({ theme }) => theme.palette.divider};
  border-radius: 8px;
  padding: 1rem;
`

export const StyledNoteListItemHeader = styled(Stack)`
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.palette.text.secondary};
  height: 1rem;
  align-items: center;
`
