import { observer } from 'mobx-react-lite'

import { useStore } from '@shared/context'
import type { TableViewItem } from '@shared/types'
import { StyledTableWrapper, StyledTable } from '@styles'

import { TableHeader, TableBody, Colgroup } from './ui'

type TableViewListProps = {
  list: TableViewItem[]
}

export const TableViewList: React.FC<TableViewListProps> = observer(({ list }) => {
  const {
    habitStore: { habits },
  } = useStore()

  return (
    <div>
      <StyledTableWrapper>
        <StyledTable>
          <Colgroup list={list} />
          <TableHeader list={list} />
          <TableBody habits={habits} list={list} />
        </StyledTable>
      </StyledTableWrapper>
    </div>
  )
})
