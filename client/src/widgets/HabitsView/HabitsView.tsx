import { observer } from 'mobx-react-lite'

import { MonthNavigator } from '@features/MonthNavigator'
import { TableView } from '@features/TableView'
import type { ViewMode } from '@shared/types'

type HabitsViewProps = {
  mode: ViewMode
}

export const HabitsView: React.FC<HabitsViewProps> = observer(({ mode }) => {
  return (
    <>
      <MonthNavigator />
      <TableView />
    </>
  )
})
