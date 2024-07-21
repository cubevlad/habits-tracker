import { Stack, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'

import { useStore } from '@shared/context'
import { useModal } from '@shared/lib'
import type { TableViewItem } from '@shared/types'

import { StyledCardWrapper } from './Card.styled'
import { ItemModalView } from './ui'

type CardProps = {
  item: TableViewItem
}

export const Card: React.FC<CardProps> = observer(({ item }) => {
  const {
    tableViewStore: { initialViewData },
  } = useStore()

  const dayName = item.weekDayName
  const isDaysAreEqual = initialViewData.getDate() === item.dayOfTheMonth
  const isMonthsAreEqual = initialViewData.getMonth() === item.monthNumber
  const selected = isDaysAreEqual && isMonthsAreEqual

  const { Modal, handleOpen: handleModalOpen } = useModal()

  const handleItemClick = () => !item.disabled && handleModalOpen()

  return (
    <>
      <StyledCardWrapper $disabled={item.disabled} $selected={selected} onClick={handleItemClick}>
        {item.disabled ? null : (
          <Stack alignItems='center' direction='row' justifyContent='space-between'>
            <Typography>{item.index}</Typography>
            <Typography>{dayName}</Typography>
          </Stack>
        )}
      </StyledCardWrapper>
      <Modal>
        <ItemModalView item={item} />
      </Modal>
    </>
  )
})
