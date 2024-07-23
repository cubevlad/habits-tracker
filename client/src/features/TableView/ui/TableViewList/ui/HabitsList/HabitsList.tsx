import { useMemo } from 'react'

import { observer } from 'mobx-react-lite'

import type { Habit } from '@shared/types'
import { StyledTableRow, StyledTableTd } from '@styles'

import { HabitTableCellItem } from './ui'

type HabitsListProps = {
  habits: Habit[]
  daysLength: number
}

export const HabitsList: React.FC<HabitsListProps> = observer(({ habits, daysLength }) => {
  const arrayFromZeroToDaysLength = useMemo(
    () => Array.from({ length: daysLength }, (_, i) => i),
    [daysLength]
  )

  return (
    <>
      {habits.map((habit, index) => (
        <StyledTableRow key={habit.id} data-row-key={index}>
          <StyledTableTd>
            <div>{habit.name}</div>
          </StyledTableTd>
          {arrayFromZeroToDaysLength.map((day) => (
            <StyledTableTd key={day}>
              <HabitTableCellItem habit={habit} />
            </StyledTableTd>
          ))}
          <StyledTableTd>{habit.goal}</StyledTableTd>
          <StyledTableTd>0</StyledTableTd>
        </StyledTableRow>
      ))}
    </>
  )
})
