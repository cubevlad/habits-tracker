import { cloneElement, useCallback, useMemo, useRef } from 'react'

import { Button } from '@mui/material'

import { useBoolean } from '@shared/lib'
import type { Note } from '@shared/types'

import { NoteForm } from './ui/NoteForm'

type UseNotesFormProps = {
  customButton?: React.ReactElement
}

export const useNotesForm = ({ customButton }: UseNotesFormProps = {}) => {
  const { value: isOpen, setTrue: openForm, setFalse: closeFrom } = useBoolean()

  const refState = useRef<{ note?: Note; createdAt?: Date | string }>({
    note: undefined,
    createdAt: undefined,
  })

  const handleFormClose = useCallback(() => {
    refState.current.note = undefined
    refState.current.createdAt = undefined
    closeFrom()
  }, [closeFrom])

  const handleFormOpen = useCallback(
    (note?: Note, createdAt?: Date | string) => {
      refState.current.note = note
      refState.current.createdAt = createdAt
      openForm()
    },
    [openForm]
  )

  const FormButton = useCallback(
    ({ disabled }: { disabled?: boolean }) =>
      customButton ? (
        cloneElement(customButton, {
          onClick: () => handleFormOpen(),
          disabled: disabled ?? isOpen,
        })
      ) : (
        <Button disabled={isOpen} variant='contained' onClick={openForm}>
          Добавить заметку
        </Button>
      ),
    [customButton, handleFormOpen, openForm, isOpen]
  )

  const Form = useCallback(
    ({ onSave }: { onSave?: () => void }) => {
      const getState = () => refState.current

      const handleClose = () => {
        handleFormClose()
        onSave?.()
      }

      return isOpen ? (
        <NoteForm createdAt={getState().createdAt} note={getState().note} onClose={handleClose} />
      ) : null
    },
    [handleFormClose, isOpen]
  )

  return useMemo(
    () => ({ Form, handleOpen: handleFormOpen, handleClose: handleFormClose, FormButton, isOpen }),
    [Form, handleFormOpen, handleFormClose, FormButton, isOpen]
  )
}
