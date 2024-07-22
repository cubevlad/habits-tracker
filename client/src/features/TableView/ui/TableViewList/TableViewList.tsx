import { observer } from 'mobx-react-lite'

import type { TableViewItem } from '@shared/types'

import {
  StyledTable,
  StyledTableBody,
  StyledTableHeader,
  StyledTableRow,
  StyledTableTd,
  StyledTableTh,
  StyledTableViewListWrapper,
  StyledTableWrapper,
} from './TableViewList.styled'
import { EmptyTableBody } from './ui'
import { HabitForm } from './ui/HabitForm'

type TableViewListProps = {
  list: TableViewItem[]
}

export const TableViewList: React.FC<TableViewListProps> = observer(({ list }) => {
  console.log(list)

  const habits = []

  return (
    <StyledTableViewListWrapper spacing={4}>
      <StyledTableWrapper>
        <StyledTable>
          <colgroup>
            {list.map(({ id }) => (
              <col key={id} width='3px' />
            ))}
          </colgroup>
          <StyledTableHeader>
            <StyledTableRow>
              {list.map(({ id, shortWeekDayName }) => (
                <StyledTableTh key={id}>{shortWeekDayName}</StyledTableTh>
              ))}
            </StyledTableRow>
            <StyledTableRow>
              {list.map(({ id, dayOfTheMonth }) => (
                <StyledTableTh key={id}>{dayOfTheMonth}</StyledTableTh>
              ))}
            </StyledTableRow>
          </StyledTableHeader>
          <StyledTableBody>
            <StyledTableRow>
              {!habits.length ? (
                <StyledTableTd colSpan={list.length}>
                  <EmptyTableBody />
                </StyledTableTd>
              ) : null}
            </StyledTableRow>
          </StyledTableBody>
        </StyledTable>
      </StyledTableWrapper>
      <HabitForm />
    </StyledTableViewListWrapper>
  )
})
