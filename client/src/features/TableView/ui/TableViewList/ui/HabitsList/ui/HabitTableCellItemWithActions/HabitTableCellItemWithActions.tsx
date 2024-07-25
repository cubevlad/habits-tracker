import { useRef, useState } from 'react'

import { Delete, Edit } from '@mui/icons-material'
import { observer } from 'mobx-react-lite'

import { useModal } from '@shared/lib'
import type { Habit } from '@shared/types'
import { StyledTableTd } from '@styles'

import { StyledActionsWrapper } from './HabitTableCellItemWithActions.styled'
import { DeleteModalContent } from './ui'

import { useHabitForm } from '../../../HabitForm/lib'

type HabitTableCellItemWithActionsProps = {
  habit: Habit
}

export const HabitTableCellItemWithActions: React.FC<HabitTableCellItemWithActionsProps> = observer(
  ({ habit }) => {
    const [hovered, setHovered] = useState(false)
    const rowHeight = useRef(0)

    const handleMouseEnter = () => {
      setHovered(true)
    }

    const handleMouseLeave = () => {
      setHovered(false)
    }

    const { Form, handleOpen: handleFormOpen } = useHabitForm({ habit })
    const { Modal, handleOpen: handleModalOpen, handleClose } = useModal()

    const handleRowRef = (element: HTMLDivElement | null) => {
      if (!element) return

      rowHeight.current = element.offsetHeight
    }

    return (
      <>
        <StyledTableTd onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {hovered ? (
            <StyledActionsWrapper $height={rowHeight.current} direction='row' spacing={2}>
              <Edit fontSize='inherit' onClick={handleFormOpen} />
              <Delete fontSize='inherit' onClick={handleModalOpen} />
            </StyledActionsWrapper>
          ) : (
            <div ref={handleRowRef}>{habit.name}</div>
          )}
        </StyledTableTd>
        <Form />
        <Modal>
          <DeleteModalContent id={habit.id} onClose={handleClose} />
        </Modal>
      </>
    )
  }
)
