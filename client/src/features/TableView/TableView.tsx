import { observer } from 'mobx-react-lite'

import { useStore } from '@shared/context'
import { createTableViewItemsList } from '@shared/lib'

import { StyledTableViewWrapper } from './TableView.styled'
import { TableViewItem } from './ui'

const MATRIX = 35

export const TableView: React.FC = observer(() => {
  const {
    tableViewStore: { currentViewDate },
  } = useStore()

  const daysList = createTableViewItemsList(currentViewDate)
  const copy = new Date(currentViewDate)
  const nextDays = createTableViewItemsList(new Date(copy.setMonth(copy.getMonth() + 1)), {
    disabled: true,
  })
  const tableItemsToRender = [...daysList, ...nextDays.slice(0, MATRIX - daysList.length)]

  return (
    <StyledTableViewWrapper>
      {tableItemsToRender.map((item) => (
        <TableViewItem key={item.id} item={item} />
      ))}
    </StyledTableViewWrapper>
  )
})
