import { observer } from 'mobx-react-lite'

import { useThemeCtx } from '@shared/context'
import type { Habit } from '@shared/types'
import { StyledTableRow, StyledTableTd } from '@styles'

import { getColorForHabitsRecordsWithDoneStatus } from './lib'
import { HabitTableCellItem, HabitTableCellItemWithActions } from './ui'

type HabitsListProps = {
  habits: Habit[]
}

export const HabitsList: React.FC<HabitsListProps> = observer(({ habits }) => {
  const { mode } = useThemeCtx()

  return (
    <>
      {habits.map((habit, index) => {
        const color = getColorForHabitsRecordsWithDoneStatus(mode, index)

        return (
          <StyledTableRow key={habit.id} data-row-key={index}>
            <HabitTableCellItemWithActions habit={habit} />
            {habit.records.map((record) => (
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
