import styled from 'styled-components'

export const StyledTableViewItem = styled.div<{ $disabled?: boolean; $selected?: boolean }>`
  padding: 1rem;
  border: ${({ $selected }) => ($selected ? '2.3px solid red' : '0.3px solid #ccc')};
  background-color: ${({ $disabled }) => ($disabled ? 'rgba(204, 204, 204, 0.2)' : 'unset')};
`
