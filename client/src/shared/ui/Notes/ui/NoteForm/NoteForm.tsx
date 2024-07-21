import { useEffect } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { TextareaAutosize } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useForm, FormProvider } from 'react-hook-form'

import { useStore } from '@shared/context'
import type { Note } from '@shared/types'
import { StyledForm, StyledFormWrapper, StyledSubmitButton, StyledTitle } from '@styles'

import { DEFAULT_NOTE_FORM_VALUES, noteSchema } from './model'

type NoteFormProps = {
  note?: Note
  onClose?: () => void
}

export const NoteForm = observer(({ note, onClose }: NoteFormProps) => {
  const {
    notesStore: { createNote, updateNote },
    tableViewStore: { currentViewDate },
  } = useStore()

  const methods = useForm({
    defaultValues: { ...DEFAULT_NOTE_FORM_VALUES },
    mode: 'onBlur',
    resolver: yupResolver(noteSchema),
  })

  const {
    reset,
    register,
    formState: { isValid },
    handleSubmit,
  } = methods

  const handleSubmitForm = async ({ content }: { content: string }) => {
    // eslint-disable-next-line no-unused-expressions
    note
      ? await updateNote({ content, id: note.id })
      : await createNote({ content, createdAt: currentViewDate })

    onClose?.()
  }

  useEffect(() => {
    if (note) {
      reset({ content: note.content })
    }
  }, [note, reset])

  return (
    <FormProvider {...methods}>
      <StyledFormWrapper borderRadius={8} minWidth={520} p={4}>
        <StyledTitle variant='h4'> {note ? 'Редактирование' : 'Создание'} заметки </StyledTitle>
        <StyledForm spacing={4}>
          <TextareaAutosize
            {...register('content')}
            minRows={8}
            placeholder='Напишите ваши мысли'
          />
          <StyledSubmitButton
            disabled={!isValid}
            sx={{ mt: 2 }}
            type='button'
            variant='outlined'
            onClick={handleSubmit(handleSubmitForm)}
          >
            Сохранить
          </StyledSubmitButton>
        </StyledForm>
      </StyledFormWrapper>
    </FormProvider>
  )
})
