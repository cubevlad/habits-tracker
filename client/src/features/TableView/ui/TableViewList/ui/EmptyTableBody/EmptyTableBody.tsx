import { Typography } from '@mui/material'

import {
  StyledEmptyTableBodyMessageWrapper,
  StyledEmptyTableBodyWrapper,
} from './EmptyTableBody.styled'

export const EmptyTableBody = () => (
  <StyledEmptyTableBodyWrapper>
    <StyledEmptyTableBodyMessageWrapper>
      <Typography component='p'>Create your first habit by clicking on + New Habit</Typography>
    </StyledEmptyTableBodyMessageWrapper>
  </StyledEmptyTableBodyWrapper>
)
