import { Stack, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'

import { useStore } from '@shared/context'
import { useModal } from '@shared/lib'
import type { TableViewItem as Item } from '@shared/types'

import { StyledTableViewItem } from './TableViewItem.styled'
import { ItemModalView } from './ui'

type TableViewItemProps = {
  item: Item
}

export const TableViewItem: React.FC<TableViewItemProps> = observer(({ item }) => {
  const {
    tableViewStore: { initialViewData },
  } = useStore()

  const dayName = item.weekDayName
  const isDaysAreEqual = initialViewData.getDate() === item.dayOfTheMonth
  const isMonthsAreEqual = initialViewData.getMonth() === item.monthNumber
  const selected = isDaysAreEqual && isMonthsAreEqual

  const { modal, handleOpen: handleModalOpen } = useModal<Item | null>({
    children: () => <ItemModalView item={item} />,
  })

  return (
    <>
      <StyledTableViewItem $disabled={item.disabled} $selected={selected} onClick={handleModalOpen}>
        {item.disabled ? null : (
          <Stack alignItems='center' direction='row' justifyContent='space-between'>
            <Typography>{item.index}</Typography>
            <Typography>{dayName}</Typography>
          </Stack>
        )}
      </StyledTableViewItem>
      {modal}
    </>
  )
})
