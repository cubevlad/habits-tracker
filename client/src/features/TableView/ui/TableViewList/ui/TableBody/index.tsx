import { observer } from 'mobx-react-lite'

import type { Habit } from '@shared/types'
import { StyledTableBody, StyledTableRow, StyledTableTd } from '@styles'

import { EmptyTableBody } from '../EmptyTableBody'
import { HabitsList } from '../HabitsList'

type TableBodyProps<T> = {
  list: T[]
  habits: Habit[]
}

export const TableBody = observer(<T,>({ list, habits }: TableBodyProps<T>) => {
  return (
    <StyledTableBody>
      {!habits.length ? (
        <>
          <StyledTableRow />
          <StyledTableRow>
            <StyledTableTd colSpan={list.length + 3}>
              <EmptyTableBody />
            </StyledTableTd>
          </StyledTableRow>
        </>
      ) : (
        <HabitsList daysLength={list.length} habits={habits} />
      )}
    </StyledTableBody>
  )
})
