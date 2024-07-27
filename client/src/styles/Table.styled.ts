import styled from 'styled-components'

const border = '1px solid #e0e0e0'

export const StyledTableWrapper = styled.div`
  overflow: auto hidden;
  margin-bottom: 24px;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
    background: transparent;
  }
`

export const StyledTable = styled.table`
  width: calc(50% + 700px);
  min-width: 100%;
  table-layout: fixed;
  margin-bottom: 24px;
`

export const StyledTableHeader = styled.thead`
  display: table-header-group;
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

export const StyledTableTd = styled.td<{ $color?: string }>`
  text-align: center;
  padding: 8px;
  border: ${border};
  display: table-cell;
  vertical-align: inherit;
  unicode-bidi: isolate;
  overflow-wrap: break-word;
  position: relative;
  background-color: ${({ $color }) => $color ?? 'unset'};
`

export const StyledTableTh = styled.th<{ $isCurrent?: boolean }>`
  text-align: center;
  padding: 14px 4px !important;
  border: ${border};
  background-color: ${({
    $isCurrent,
    theme: {
      palette: { mode, text },
    },
  }) => {
    switch (mode) {
      case 'light': {
        return $isCurrent ? text.disabled : 'unset'
      }
      case 'dark': {
        return $isCurrent ? text.secondary : 'unset'
      }

      default: {
        return 'unset'
      }
    }
  }};
`
