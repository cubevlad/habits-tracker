import { useCallback, useMemo } from 'react'

import { Button } from '@mui/material'

import { useModal } from '@shared/lib'
import type { Note } from '@shared/types'

import { NoteForm } from '../ui/NoteForm'

type UseNotesFormProps = {
  note?: Note
  canAddNewNote?: boolean
}

export const useNotesForm = ({ note, canAddNewNote }: UseNotesFormProps = {}) => {
  const { Modal, handleOpen, handleClose } = useModal()

  const isAddFormVisible = canAddNewNote ?? !note

  const Form = useCallback(
    ({ createdAt }: { createdAt?: Date | string }) => (
      <>
        {isAddFormVisible ? (
          <Button variant='contained' onClick={handleOpen}>
            Добавить заметку
          </Button>
        ) : null}
        <Modal>
          <NoteForm createdAt={createdAt} note={note} onClose={handleClose} />
        </Modal>
      </>
    ),
    [Modal, handleClose, handleOpen, isAddFormVisible, note]
  )

  return useMemo(() => ({ Form, handleOpen }), [Form, handleOpen])
}
