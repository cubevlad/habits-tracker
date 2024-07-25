import { cloneElement, useCallback, useMemo } from 'react'

import { Button } from '@mui/material'

import { useModal } from '@shared/lib'
import type { Note } from '@shared/types'

import { NoteForm } from '../ui/NoteForm'

type UseNotesFormProps = {
  note?: Note
  canAddNewNote?: boolean
  customButton?: React.ReactElement
}

export const useNotesForm = ({ note, canAddNewNote, customButton }: UseNotesFormProps = {}) => {
  const { Modal, handleOpen, handleClose } = useModal()

  const isAddFormVisible = canAddNewNote ?? !note

  const FormButton = useMemo(
    () =>
      customButton ? (
        cloneElement(customButton, { onClick: handleOpen })
      ) : (
        <Button variant='contained' onClick={handleOpen}>
          Добавить заметку
        </Button>
      ),
    [customButton, handleOpen]
  )

  const Form = useCallback(
    ({ createdAt }: { createdAt?: Date | string }) => (
      <>
        {isAddFormVisible ? FormButton : null}
        <Modal>
          <NoteForm createdAt={createdAt} note={note} onClose={handleClose} />
        </Modal>
      </>
    ),
    [FormButton, Modal, handleClose, isAddFormVisible, note]
  )

  return useMemo(() => ({ Form, handleOpen, handleClose }), [Form, handleClose, handleOpen])
}
