import { useCallback, useMemo } from 'react'

import { Button } from '@mui/material'

import { useModal } from '@shared/lib'
import type { Habit } from '@shared/types'

import { HabitForm } from '../HabitForm'

type UseHabitFormProps = {
  habit?: Habit
  canAddNewNote?: boolean
}

export const useHabitForm = ({ habit, canAddNewNote }: UseHabitFormProps = {}) => {
  const { Modal, handleOpen, handleClose } = useModal()

  const isAddFormVisible = canAddNewNote ?? !habit

  const Form = useCallback(
    () => (
      <>
        {isAddFormVisible ? (
          <Button variant='outlined' onClick={handleOpen}>
            + Добавить привычку
          </Button>
        ) : null}
        <Modal>
          <HabitForm habit={habit} onClose={handleClose} />
        </Modal>
      </>
    ),
    [Modal, handleClose, handleOpen, isAddFormVisible, habit]
  )

  return useMemo(() => ({ Form, handleOpen }), [Form, handleOpen])
}
