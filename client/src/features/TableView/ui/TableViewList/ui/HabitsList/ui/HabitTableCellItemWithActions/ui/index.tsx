import { Stack } from '@mui/material'
import { observer } from 'mobx-react-lite'

import { useStore } from '@shared/context'
import { StyledFormWrapper, StyledTitle, StyledSubmitButton } from '@styles'

type DeleteModalContentProps = {
  id: string
  onClose: () => void
}

export const DeleteModalContent: React.FC<DeleteModalContentProps> = observer(({ onClose, id }) => {
  const {
    habitStore: { deleteHabit },
  } = useStore()

  const handleDelete = async () => {
    await deleteHabit(id)
    onClose()
  }

  return (
    <StyledFormWrapper borderRadius={8} minWidth={520} p={4}>
      <StyledTitle variant='h4'>Удалить привычку?</StyledTitle>
      <Stack direction='row' spacing={2}>
        <StyledSubmitButton color='error' variant='contained' onClick={onClose}>
          Нет
        </StyledSubmitButton>
        <StyledSubmitButton variant='contained' onClick={handleDelete}>
          Да
        </StyledSubmitButton>
      </Stack>
    </StyledFormWrapper>
  )
})
