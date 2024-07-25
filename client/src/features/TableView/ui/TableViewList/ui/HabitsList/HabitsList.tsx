import { observer } from 'mobx-react-lite'

import { ACHIEVED_COLOR } from '@shared/constants'
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

        const isAchieved = habit.achieved >= habit.goal
        const achievedColor = isAchieved ? ACHIEVED_COLOR : 'unset'

        return (
          <StyledTableRow key={habit.id} data-row-key={index}>
            <HabitTableCellItemWithActions habit={habit} />
            {habit.records.map((record) => (
              <HabitTableCellItem key={record.id} completeRecordColor={color} record={record} />
            ))}
            <StyledTableTd $color={achievedColor}>{habit.goal}</StyledTableTd>
            <StyledTableTd $color={achievedColor}>{habit.achieved}</StyledTableTd>
          </StyledTableRow>
        )
      })}
    </>
  )
})
