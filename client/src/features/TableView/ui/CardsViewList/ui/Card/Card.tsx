import { Stack, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'

import { useStore } from '@shared/context'
import { useModal } from '@shared/lib'
import type { TableViewItem } from '@shared/types'

import { StyledCardWrapper, StyledChip } from './Card.styled'
import { ItemModalView } from './ui'

type CardProps = {
  item: TableViewItem
}

export const Card: React.FC<CardProps> = observer(({ item }) => {
  const {
    notesStore: { getNotesById },
    habitStore: { habits, flatHabitsWithFlatRecordsList },
  } = useStore()

  const dayName = item.weekDayName
  const notesLength = (getNotesById(item.id) ?? []).length
  const habitsLength = habits.length

  const { Modal, handleOpen: handleModalOpen } = useModal()

  const handleItemClick = () => !item.disabled && handleModalOpen()

  const isCardAchieved = !habits.length
    ? false
    : habits.every((habit) => flatHabitsWithFlatRecordsList[habit.id][item.habitRecordId]?.done)

  return (
    <>
      <StyledCardWrapper
        $disabled={item.disabled}
        $isAchieved={isCardAchieved}
        $selected={item.isCurrent}
        onClick={handleItemClick}
      >
        {item.disabled ? null : (
          <Stack height='100%'>
            <Stack direction='row' flex='1 1 auto' justifyContent='space-between'>
              <Typography>{item.index}</Typography>
              <Typography>{dayName}</Typography>
            </Stack>
            <Stack alignItems='center' direction='row' justifyContent='space-between'>
              {habitsLength ? <StyledChip color='primary' /> : <span />}
              {notesLength ? <StyledChip color='secondary' /> : <span />}
            </Stack>
          </Stack>
        )}
      </StyledCardWrapper>
      <Modal>
        <ItemModalView item={item} />
      </Modal>
    </>
  )
})
