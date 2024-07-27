import { cloneElement, useCallback, useMemo, useRef } from 'react'

import { Button } from '@mui/material'

import { useBoolean } from '@shared/lib'
import type { Note } from '@shared/types'

import { NoteForm } from './ui/NoteForm'

type UseNotesFormProps = {
  customButton?: React.ReactElement
}

export const useNotesForm = ({ customButton }: UseNotesFormProps = {}) => {
  const { value: isOpen, setTrue: handleOpen, setFalse: handleClose } = useBoolean()

  const refState = useRef<{ note?: Note; createdAt?: Date | string }>({
    note: undefined,
    createdAt: undefined,
  })

  const handleFormClose = useCallback(() => {
    refState.current.note = undefined
    refState.current.createdAt = undefined
    handleClose()
  }, [handleClose])

  const handleFormOpen = useCallback(
    (note?: Note, createdAt?: Date | string) => {
      refState.current.note = note
      refState.current.createdAt = createdAt
      handleOpen()
    },
    [handleOpen]
  )

  const FormButton = useCallback(
    ({ disabled }: { disabled?: boolean }) =>
      customButton ? (
        cloneElement(customButton, {
          onClick: () => handleFormOpen(),
          disabled: disabled ?? isOpen,
        })
      ) : (
        <Button disabled={isOpen} variant='contained' onClick={handleOpen}>
          Добавить заметку
        </Button>
      ),
    [customButton, handleFormOpen, handleOpen, isOpen]
  )

  const Form = useCallback(() => {
    const getState = () => refState.current

    return isOpen ? (
      <NoteForm createdAt={getState().createdAt} note={getState().note} onClose={handleFormClose} />
    ) : null
  }, [handleFormClose, isOpen])

  return useMemo(
    () => ({ Form, handleOpen: handleFormOpen, handleClose: handleFormClose, FormButton, isOpen }),
    [Form, handleFormOpen, handleFormClose, FormButton, isOpen]
  )
}
