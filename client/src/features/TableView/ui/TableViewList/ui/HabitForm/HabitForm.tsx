import { useEffect } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { TextField } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useForm, FormProvider } from 'react-hook-form'

import { useStore } from '@shared/context'
import type { Habit } from '@shared/types'
import { StyledFormWrapper, StyledTitle, StyledForm, StyledSubmitButton } from '@styles'

import { DEFAULT_HABIT_FORM_VALUES, type HabitFormType, habitSchema } from './model'

type HabitFormProps = {
  habit?: Habit
  onClose?: () => void
}

export const HabitForm: React.FC<HabitFormProps> = observer(({ habit: habitProp, onClose }) => {
  const {
    habitStore: { createHabit, updateHabit },
  } = useStore()

  const methods = useForm<HabitFormType>({
    defaultValues: { ...DEFAULT_HABIT_FORM_VALUES },
    mode: 'all',
    resolver: yupResolver(habitSchema),
  })

  const {
    reset,
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = methods

  const handleSubmitForm = async (habit: Pick<Habit, 'goal' | 'name'>) => {
    // eslint-disable-next-line no-unused-expressions
    habitProp ? await updateHabit({ ...habit, id: habitProp.id }) : await createHabit(habit)

    onClose?.()
    reset(DEFAULT_HABIT_FORM_VALUES)
  }

  useEffect(() => {
    if (habitProp) {
      reset(habitProp)
    }
  }, [habitProp, reset])

  return (
    <FormProvider {...methods}>
      <StyledFormWrapper borderRadius={8} minWidth={520} p={4}>
        <StyledTitle variant='h4'>
          {habitProp ? 'Редактирование привычки' : 'Создание привычки'}
        </StyledTitle>
        <StyledForm spacing={4}>
          <TextField
            {...register('name')}
            fullWidth
            error={!isValid && !!errors.name?.message}
            helperText={errors.name?.message}
            label='Имя'
            variant='outlined'
          />
          <TextField
            {...register('goal')}
            fullWidth
            error={!isValid && !!errors.goal?.message}
            helperText={errors.goal?.message}
            label='Цель'
            type='number'
            variant='outlined'
          />
          <StyledSubmitButton
            disabled={!isValid}
            sx={{ mt: 2 }}
            type='button'
            variant='outlined'
            onClick={handleSubmit(handleSubmitForm)}
          >
            {habitProp ? 'Сохранить' : 'Создать'}
          </StyledSubmitButton>
        </StyledForm>
      </StyledFormWrapper>
    </FormProvider>
  )
})
