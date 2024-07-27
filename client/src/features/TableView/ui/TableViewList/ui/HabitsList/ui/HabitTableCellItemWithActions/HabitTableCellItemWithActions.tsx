import { useRef, useState } from 'react'

import { Delete, Edit } from '@mui/icons-material'
import { observer } from 'mobx-react-lite'

import { useFormCtx } from '@shared/context'
import { useModal } from '@shared/lib'
import type { Habit } from '@shared/types'
import { StyledTableTd } from '@styles'

import { StyledActionsWrapper } from './HabitTableCellItemWithActions.styled'
import { DeleteModalContent } from './ui'

type HabitTableCellItemWithActionsProps = {
  habit: Habit
}

export const HabitTableCellItemWithActions: React.FC<HabitTableCellItemWithActionsProps> = observer(
  ({ habit }) => {
    const [hovered, setHovered] = useState(false)
    const rowHeight = useRef(0)

    const { Modal, handleOpen, handleClose } = useModal()

    const handleMouseEnter = () => {
      setHovered(true)
    }

    const handleMouseLeave = () => {
      setHovered(false)
    }

    const { handleHabitsFormOpen } = useFormCtx()

    const handleRowRef = (element: HTMLDivElement | null) => {
      if (!element) return

      rowHeight.current = element.offsetHeight
    }

    const handleEdit = () => {
      handleHabitsFormOpen(habit)
    }

    return (
      <>
        <StyledTableTd onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {hovered ? (
            <StyledActionsWrapper $height={rowHeight.current} direction='row' spacing={2}>
              <Edit fontSize='inherit' onClick={handleEdit} />
              <Delete fontSize='inherit' onClick={handleOpen} />
            </StyledActionsWrapper>
          ) : (
            <div ref={handleRowRef}>{habit.name}</div>
          )}
        </StyledTableTd>
        <Modal>
          <DeleteModalContent id={habit.id} onClose={handleClose} />
        </Modal>
      </>
    )
  }
)
