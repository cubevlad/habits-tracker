import styled from 'styled-components'

export const StyledCol = styled.col<{ $isCurrent: boolean }>`
  border: ${({
    $isCurrent,
    theme: {
      palette: { mode, primary },
    },
  }) => {
    switch (mode) {
      case 'light': {
        return $isCurrent ? `2px solid ${primary.main}` : 'unset'
      }
      case 'dark': {
        return $isCurrent ? '2px solid yellow' : 'unset'
      }

      default: {
        return 'unset'
      }
    }
  }};
`
