import { Stack } from '@mui/material'
import styled from 'styled-components'

const border = '1px solid #e0e0e0'

export const StyledTableViewListWrapper = styled(Stack)``

export const StyledTableWrapper = styled.div`
  overflow: auto hidden;
`

export const StyledTable = styled.table`
  width: calc(50% + 700px);
  min-width: 100%;
  table-layout: fixed;
  text-align: center;
  border: ${border};
`

export const StyledTableHeader = styled.thead`
  table-header-group;
  vertical-align: middle;
  unicode-bidi: isolate;
  border-color: inherit;
  border: ${border};
  `

export const StyledTableBody = styled.tbody`
  display: table-row-group;
  vertical-align: middle;
  unicode-bidi: isolate;
  border-color: inherit;
`

export const StyledTableRow = styled.tr`
  display: table-row;
  vertical-align: inherit;
  unicode-bidi: isolate;
  border-color: inherit;
`

export const StyledTableTd = styled.td`
  text-align: center;
  padding: 8px;
  border: ${border};
  display: table-cell;
  vertical-align: inherit;
  unicode-bidi: isolate;
  overflow-wrap: break-word;
  position: relative;
`

export const StyledTableTh = styled.th`
  padding: 0;
  border: none;
  text-align: center;
  padding: 14px 4px !important;
  border: ${border};
`
