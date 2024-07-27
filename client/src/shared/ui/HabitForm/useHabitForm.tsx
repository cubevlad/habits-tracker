import { cloneElement, useCallback, useMemo, useRef } from 'react'

import { Button } from '@mui/material'

import { useBoolean } from '@shared/lib'
import type { Habit } from '@shared/types'

import { HabitForm } from './HabitForm'

type UseHabitFormProps = {
  customButton?: React.ReactElement
}
export const useHabitForm = ({ customButton }: UseHabitFormProps = {}) => {
  const { value: isOpen, setTrue: openForm, setFalse: closeForm } = useBoolean()

  const refState = useRef<{ habit?: Habit }>({ habit: undefined })

  const handleFormClose = useCallback(() => {
    refState.current.habit = undefined
    closeForm()
  }, [closeForm])

  const handleFormOpen = useCallback(
    (habit?: Habit) => {
      refState.current.habit = habit
      openForm()
    },
    [openForm]
  )

  const FormButton = useCallback(
    ({ disabled }: { disabled?: boolean }) => {
      return customButton ? (
        cloneElement(customButton, {
          onClick: () => handleFormOpen(),
          disabled: disabled ?? isOpen,
        })
      ) : (
        <Button disabled={isOpen} variant='outlined' onClick={openForm}>
          + Добавить привычку
        </Button>
      )
    },
    [customButton, handleFormOpen, openForm, isOpen]
  )

  const Form = useCallback(
    ({ onSave }: { onSave?: () => void }) => {
      const getState = () => refState.current

      const handleClose = () => {
        handleFormClose()
        onSave?.()
      }

      return isOpen ? <HabitForm habit={getState().habit} onClose={handleClose} /> : null
    },
    [handleFormClose, isOpen]
  )

  return useMemo(
    () => ({ Form, handleOpen: handleFormOpen, handleClose: handleFormClose, FormButton, isOpen }),
    [Form, handleFormOpen, handleFormClose, FormButton, isOpen]
  )
}
