import { cloneElement, useCallback, useMemo, useRef } from 'react'

import { Button } from '@mui/material'

import { useBoolean } from '@shared/lib'
import type { Habit } from '@shared/types'

import { HabitForm } from './HabitForm'

type UseHabitFormProps = {
  customButton?: React.ReactElement
}
export const useHabitForm = ({ customButton }: UseHabitFormProps = {}) => {
  const { value: isOpen, setTrue: handleOpen, setFalse: handleClose } = useBoolean()

  const refState = useRef<{ habit?: Habit }>({ habit: undefined })

  const handleFormClose = useCallback(() => {
    refState.current.habit = undefined
    handleClose()
  }, [handleClose])

  const handleFormOpen = useCallback(
    (habit?: Habit) => {
      refState.current.habit = habit
      handleOpen()
    },
    [handleOpen]
  )

  const FormButton = useMemo(() => {
    return customButton ? (
      cloneElement(customButton, { onClick: () => handleFormOpen(), disabled: isOpen })
    ) : (
      <Button disabled={isOpen} variant='outlined' onClick={handleOpen}>
        + Добавить привычку
      </Button>
    )
  }, [customButton, handleFormOpen, handleOpen, isOpen])

  const Form = useCallback(() => {
    const getState = () => refState.current

    return isOpen ? <HabitForm habit={getState().habit} onClose={handleFormClose} /> : null
  }, [handleFormClose, isOpen])

  return useMemo(
    () => ({ Form, handleOpen: handleFormOpen, handleClose: handleFormClose, FormButton, isOpen }),
    [Form, handleFormOpen, handleFormClose, FormButton, isOpen]
  )
}
