import { yupResolver } from '@hookform/resolvers/yup'
import { Button, TextareaAutosize, TextField } from '@mui/material'
import { isValid } from 'date-fns'
import { observer } from 'mobx-react-lite'
import { useForm, FormProvider } from 'react-hook-form'

import { useModal } from '@shared/lib'
import { noteSchema } from '@shared/ui/Notes/ui/NoteForm/model'
import { StyledFormWrapper, StyledTitle, StyledForm, StyledSubmitButton } from '@styles'

import { DEFAULT_HABIT_FORM_VALUES, type HabitFormType } from './model'

export const HabitForm: React.FC = observer(() => {
  const { Modal, handleOpen } = useModal()

  const methods = useForm<HabitFormType>({
    defaultValues: { ...DEFAULT_HABIT_FORM_VALUES },
    mode: 'onBlur',
    resolver: yupResolver(noteSchema),
  })

  const {
    register,
    formState: { isValid },
    handleSubmit,
    reset,
  } = methods

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
                {...register('password')}
                fullWidth
                error={!isValid && !!errors.password?.message}
                helperText={isValid ? '' : errors.password?.message}
                label='Пароль'
                variant='outlined'
              />
              <StyledSubmitButton
                disabled={!isValid}
                sx={{ mt: 2 }}
                type='button'
                variant='outlined'
                onClick={handleSubmit(handleSubmitForm)}
              >
                Войти
              </StyledSubmitButton>
            </StyledForm>
          </StyledFormWrapper>
        </FormProvider>
      </Modal>
    </>
  )
})
