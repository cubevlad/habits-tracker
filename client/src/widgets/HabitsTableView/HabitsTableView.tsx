import { MonthNavigator } from '@features/MonthNavigator'
import { TableView } from '@features/TableView'

export const HabitsTableView: React.FC = () => {
  return (
    <>
      <MonthNavigator />
      <TableView />
    </>
  )
}
