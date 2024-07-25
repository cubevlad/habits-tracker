import { cloneElement, useCallback, useMemo } from 'react'

import { Button } from '@mui/material'

import { useModal } from '@shared/lib'
import type { Habit } from '@shared/types'

import { HabitForm } from '../HabitForm'

type UseHabitFormProps = {
  habit?: Habit
  canAddNewHabit?: boolean
  customButton?: React.ReactElement
}

export const useHabitForm = ({ habit, canAddNewHabit, customButton }: UseHabitFormProps = {}) => {
  const { Modal, handleOpen, handleClose } = useModal()

  const isAddFormVisible = canAddNewHabit ?? !habit

  const FormButton = useMemo(
    () =>
      customButton ? (
        cloneElement(customButton, { onClick: handleOpen })
      ) : (
        <Button variant='outlined' onClick={handleOpen}>
          + Добавить привычку
        </Button>
      ),
    [customButton, handleOpen]
  )

  const Form = useCallback(
    () => (
      <>
        {isAddFormVisible ? FormButton : null}
        <Modal>
          <HabitForm habit={habit} onClose={handleClose} />
        </Modal>
      </>
    ),
    [isAddFormVisible, FormButton, Modal, habit, handleClose]
  )

  return useMemo(() => ({ Form, handleOpen }), [Form, handleOpen])
}
