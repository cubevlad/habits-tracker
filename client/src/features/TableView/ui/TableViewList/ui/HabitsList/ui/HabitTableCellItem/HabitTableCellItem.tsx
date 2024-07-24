import { Done } from '@mui/icons-material'
import { observer } from 'mobx-react-lite'

import { useStore } from '@shared/context'
import type { HabitRecord } from '@shared/types'
import { StyledTableTd } from '@styles'

import { StyledCellItemIcon } from './HabitTableCellItem.styled'

type HabitTableCellItemProps = {
  record: HabitRecord | (HabitRecord & { disabled: boolean })
  completeRecordColor: string
}

export const HabitTableCellItem: React.FC<HabitTableCellItemProps> = observer(
  ({ record, completeRecordColor }) => {
    const {
      habitStore: { updateHabitRecord },
    } = useStore()

    const handleClick = () => {
      if ('disabled' in record && record.disabled) {
        return
      }

      updateHabitRecord({ ...record, done: !record.done })
    }

    const color = record.done ? completeRecordColor : undefined

    return (
      <StyledTableTd $color={color} onClick={handleClick}>
        {record.done ? (
          <StyledCellItemIcon>
            <Done fontSize='inherit' />
          </StyledCellItemIcon>
        ) : null}
      </StyledTableTd>
    )
  }
)
