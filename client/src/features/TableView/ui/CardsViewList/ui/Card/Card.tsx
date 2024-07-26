import { useState } from 'react'

import { ArrowBack } from '@mui/icons-material'
import { IconButton, Stack, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'

import { useFormCtx, useStore } from '@shared/context'
import type { TableViewItem } from '@shared/types'
import { Dialog } from '@shared/ui'

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

  const isCardAchieved = !habits.length
    ? false
    : habits.every((habit) => flatHabitsWithFlatRecordsList[habit.id][item.habitRecordId]?.done)

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const handleDialogOpen = () => setIsDialogOpen(true)
  const handleDialogClose = () => setIsDialogOpen(false)

  const handleItemClick = () => !item.disabled && handleDialogOpen()

  const {
    NoteForm,
    NoteFormButton,
    isNoteFormOpen,
    handleNoteFormClose,
    isHabitsFormOpen,
    HabitsForm,
    HabitsFormButton,
    handleHabitsFormClose,
  } = useFormCtx()

  const areFormsClosed = !isNoteFormOpen && !isHabitsFormOpen

  const handleStepBack = () => {
    if (isNoteFormOpen) handleNoteFormClose()
    if (isHabitsFormOpen) handleHabitsFormClose()
  }

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
      <Dialog
        customDialogActions={
          <>
            {HabitsFormButton}
            {NoteFormButton}
          </>
        }
        customHeader={
          !areFormsClosed ? (
            <IconButton onClick={handleStepBack}>
              <ArrowBack fontSize='inherit' />
            </IconButton>
          ) : (
            <Stack direction='row' flex='1 1 auto' justifyContent='space-between'>
              <Typography variant='h6'>{item.id}</Typography>
              <Typography variant='h6'>{item.weekDayName}</Typography>
            </Stack>
          )
        }
        open={isDialogOpen}
        onCancel={handleDialogClose}
        onClose={handleDialogClose}
        onOk={handleDialogClose}
      >
        {areFormsClosed ? <ItemModalView item={item} /> : null}
        <HabitsForm />
        <NoteForm />
      </Dialog>
    </>
  )
})
