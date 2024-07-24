import { useMemo } from 'react'

import { observer } from 'mobx-react-lite'

import { useThemeCtx } from '@shared/context'
import type { Habit, HabitRecord } from '@shared/types'
import { StyledTableRow, StyledTableTd } from '@styles'

import { getColorForHabitsRecordsWithDoneStatus } from './lib'
import { HabitTableCellItem, HabitTableCellItemWithActions } from './ui'

type HabitsListProps = {
  habits: Habit[]
  daysLength: number
}

export const HabitsList: React.FC<HabitsListProps> = observer(({ habits, daysLength }) => {
  const { mode } = useThemeCtx()

  const arrayFromZeroToDaysLength = useMemo<HabitRecord[]>(
    () =>
      Array.from({ length: daysLength }, (_, i) => ({
        id: String(i),
        done: false,
        date: new Date().toISOString(),
        habitId: String(i),
        disabled: true,
      })),
    [daysLength]
  )

  return (
    <>
      {habits.map((habit, index) => {
        const color = getColorForHabitsRecordsWithDoneStatus(mode, index)

        return (
          <StyledTableRow key={habit.id} data-row-key={index}>
            <HabitTableCellItemWithActions habit={habit} />
            {(!habit.records.length ? arrayFromZeroToDaysLength : habit.records).map((record) => (
              <HabitTableCellItem key={record.id} completeRecordColor={color} record={record} />
            ))}
            <StyledTableTd>{habit.goal}</StyledTableTd>
            <StyledTableTd>0</StyledTableTd>
          </StyledTableRow>
        )
      })}
    </>
  )
})
