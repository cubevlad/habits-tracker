import { useMemo } from 'react'

import { Button } from '@mui/material'
import { observer } from 'mobx-react-lite'

import { FormContextProvider } from '@shared/context'
import { useNotesForm, useHabitForm } from '@shared/ui'

import { BUTTON_STYLES } from './constants'

type TableViewFormContextProps = {
  children?: React.ReactNode
}

export const TableViewFormContextProvider: React.FC<TableViewFormContextProps> = observer(
  ({ children }) => {
    const {
      Form: NoteForm,
      FormButton: NoteFormButton,
      isOpen: isNoteFormOpen,
      handleClose: handleNoteFormClose,
      handleOpen: handleNoteFormOpen,
    } = useNotesForm({
      customButton: (
        <Button sx={BUTTON_STYLES} variant='outlined'>
          + заметка
        </Button>
      ),
    })

    const {
      Form: HabitsForm,
      FormButton: HabitsFormButton,
      isOpen: isHabitsFormOpen,
      handleClose: handleHabitsFormClose,
      handleOpen: handleHabitsFormOpen,
    } = useHabitForm({
      customButton: (
        <Button sx={BUTTON_STYLES} variant='outlined'>
          + привычка
        </Button>
      ),
    })

    const contextValue = useMemo(
      () => ({
        NoteForm,
        NoteFormButton,
        isNoteFormOpen,
        handleNoteFormClose,
        handleNoteFormOpen,
        HabitsForm,
        HabitsFormButton,
        isHabitsFormOpen,
        handleHabitsFormClose,
        handleHabitsFormOpen,
      }),
      [
        HabitsForm,
        HabitsFormButton,
        NoteForm,
        NoteFormButton,
        handleHabitsFormClose,
        handleHabitsFormOpen,
        handleNoteFormClose,
        handleNoteFormOpen,
        isHabitsFormOpen,
        isNoteFormOpen,
      ]
    )

    return <FormContextProvider value={contextValue}>{children}</FormContextProvider>
  }
)
