import { Typography } from '@mui/material'

import {
  StyledEmptyTableBodyMessageWrapper,
  StyledEmptyTableBodyWrapper,
} from './EmptyTableBody.styled'

export const EmptyTableBody = () => (
  <StyledEmptyTableBodyWrapper>
    <StyledEmptyTableBodyMessageWrapper>
      <Typography component='p'>
        Чтобы добавить привычку, нажмите на кнопку «Добавить привычку»
      </Typography>
    </StyledEmptyTableBodyMessageWrapper>
  </StyledEmptyTableBodyWrapper>
)
