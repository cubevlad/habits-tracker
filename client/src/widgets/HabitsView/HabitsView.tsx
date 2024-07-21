import { observer } from 'mobx-react-lite'

import { DateNavigator } from '@features/DateNavigator'
import { TableView } from '@features/TableView'

export const HabitsView: React.FC = observer(() => {
  return (
    <>
      <DateNavigator />
      <TableView />
    </>
  )
})
