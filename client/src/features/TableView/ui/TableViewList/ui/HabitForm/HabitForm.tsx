import { yupResolver } from '@hookform/resolvers/yup'
import { Button, TextField } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useForm, FormProvider } from 'react-hook-form'

import { useStore } from '@shared/context'
import { useModal } from '@shared/lib'
import type { Habit } from '@shared/types'
import { StyledFormWrapper, StyledTitle, StyledForm, StyledSubmitButton } from '@styles'

import { DEFAULT_HABIT_FORM_VALUES, type HabitFormType, habitSchema } from './model'

export const HabitForm: React.FC = observer(() => {
  const {
    habitStore: { createHabit },
  } = useStore()

  const { Modal, handleOpen, handleClose } = useModal()

  const methods = useForm<HabitFormType>({
    defaultValues: { ...DEFAULT_HABIT_FORM_VALUES },
    mode: 'onBlur',
    resolver: yupResolver(habitSchema),
  })

  const {
    reset,
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = methods

  const handleSubmitForm = async (habit: Pick<Habit, 'goal' | 'name'>) => {
    await createHabit(habit)
    handleClose()
    reset(DEFAULT_HABIT_FORM_VALUES)
  }

  return (
    <>
      <Button variant='contained' onClick={handleOpen}>
        Add habit
      </Button>
      <Modal>
        <FormProvider {...methods}>
          <StyledFormWrapper borderRadius={8} minWidth={520} p={4}>
            <StyledTitle variant='h4'> Создание привычки </StyledTitle>
            <StyledForm spacing={4}>
              <TextField
                {...register('name')}
                fullWidth
                error={!isValid && !!errors.name?.message}
                helperText={isValid ? '' : errors.name?.message}
                label='Имя'
                variant='outlined'
              />
              <TextField
                {...register('goal')}
                fullWidth
                error={!isValid && !!errors.goal?.message}
                helperText={isValid ? '' : errors.goal?.message}
                label='Цель'
                variant='outlined'
              />
              <StyledSubmitButton
                disabled={!isValid}
                sx={{ mt: 2 }}
                type='button'
                variant='outlined'
                onClick={handleSubmit(handleSubmitForm)}
              >
                Создать
              </StyledSubmitButton>
            </StyledForm>
          </StyledFormWrapper>
        </FormProvider>
      </Modal>
    </>
  )
})
