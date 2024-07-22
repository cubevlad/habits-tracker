import { observer } from 'mobx-react-lite'

import { useStore, useViewModeCtx } from '@shared/context'
import { createTableViewItemsList, getCurrentViewMode } from '@shared/lib'

import { MAX_ITEMS_LENGTH_AVAILABLE_TO_RENDER } from './lib'
import { CardsViewList, TableViewList } from './ui'

export const TableView: React.FC = observer(() => {
  const {
    tableViewStore: { currentViewDate },
  } = useStore()

  const { mode } = useViewModeCtx()
  const { isTableView, isCardsView } = getCurrentViewMode(mode)

  const copy = new Date(currentViewDate)

  const daysOfMonthList = createTableViewItemsList(currentViewDate)
  const daysOfNextMonthList = createTableViewItemsList(
    new Date(copy.setMonth(copy.getMonth() + 1)),
    {
      disabled: true,
    }
  )

  const tableItemsToRender = [
    ...daysOfMonthList,
    ...daysOfNextMonthList.slice(0, MAX_ITEMS_LENGTH_AVAILABLE_TO_RENDER - daysOfMonthList.length),
  ]

  return (
    <>
      {isCardsView ? <CardsViewList list={tableItemsToRender} /> : null}
      {isTableView ? <TableViewList list={daysOfMonthList} /> : null}
    </>
  )
})
