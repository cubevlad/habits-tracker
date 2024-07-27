import { Button, Stack, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'

import { BUTTON_STYLES } from '@shared/constants'
import { useFormCtx, useStore } from '@shared/context'
import type { TableViewItem } from '@shared/types'
import { Dialog, Notes } from '@shared/ui'
import { StyledTableWrapper, StyledTable } from '@styles'

import { TableHeader, TableBody, Colgroup } from './ui'

type TableViewListProps = {
  list: TableViewItem[]
}

export const TableViewList: React.FC<TableViewListProps> = observer(({ list }) => {
  const {
    habitStore: { habits },
  } = useStore()

  const {
    HabitsForm,
    handleHabitsFormOpen,
    handleHabitsFormClose,
    isHabitsFormOpen,
    NoteForm,
    handleNoteFormClose,
    handleNoteFormOpen,
    isNoteFormOpen,
  } = useFormCtx()

  const handleAddHabit = () => {
    handleHabitsFormOpen()
  }

  const handleAddNote = () => {
    handleNoteFormOpen()
  }

  const handleDialogClose = () => {
    handleHabitsFormClose()
    handleNoteFormClose()
  }

  return (
    <>
      <StyledTableWrapper>
        <StyledTable>
          <Colgroup list={list} />
          <TableHeader list={list} />
          <TableBody habits={habits} list={list} />
        </StyledTable>
        <Stack alignItems='center' direction='row' spacing={2}>
          <Button sx={BUTTON_STYLES} variant='outlined' onClick={handleAddHabit}>
            <Typography variant='subtitle2'> + привычка </Typography>
          </Button>
          <Button sx={BUTTON_STYLES} variant='outlined' onClick={handleAddNote}>
            <Typography variant='subtitle2'> + заметка </Typography>
          </Button>
        </Stack>
      </StyledTableWrapper>
      <Notes />
      <Dialog
        hideDialogActions
        modalTitle=''
        open={isHabitsFormOpen || isNoteFormOpen}
        onClose={handleDialogClose}
      >
        <HabitsForm />
        <NoteForm />
      </Dialog>
    </>
  )
})
