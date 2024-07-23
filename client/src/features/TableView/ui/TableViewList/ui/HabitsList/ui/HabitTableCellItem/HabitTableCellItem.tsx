import { observer } from 'mobx-react-lite'

import { useStore } from '@shared/context'
import type { Habit } from '@shared/types'

type HabitTableCellItemProps = {
  habit: Habit
}

export const HabitTableCellItem: React.FC<HabitTableCellItemProps> = observer(({ habit }) => {
  const {
    habitStore: { updateHabit },
  } = useStore()

  return <div />
})
