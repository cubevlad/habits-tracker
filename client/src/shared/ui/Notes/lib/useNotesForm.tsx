import { useCallback, useMemo } from 'react'

import { Button } from '@mui/material'

import { useModal } from '@shared/lib'
import type { Note } from '@shared/types'

import { NoteForm } from '../ui/NoteForm'

export const useNotesForm = (note?: Note) => {
  const { Modal, handleOpen, handleClose } = useModal()

  const Form = useCallback(
    () => (
      <>
        {!note ? (
          <Button variant='contained' onClick={handleOpen}>
            Добавить заметку
          </Button>
        ) : null}
        <Modal>
          <NoteForm note={note} onClose={handleClose} />
        </Modal>
      </>
    ),
    [Modal, handleClose, handleOpen, note]
  )

  return useMemo(() => ({ Form, handleOpen }), [Form, handleOpen])
}
