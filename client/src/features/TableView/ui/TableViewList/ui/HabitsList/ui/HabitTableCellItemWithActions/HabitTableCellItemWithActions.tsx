import { observer } from 'mobx-react-lite'

import type { Habit } from '@shared/types'

type HabitTableCellItemWithActionsProps = {
  habit: Habit
}

export const HabitTableCellItemWithActions: React.FC<HabitTableCellItemWithActionsProps> = observer(
  ({ habit }) => {
    return <div>HabitTableCellItemWithActions</div>
  }
)
