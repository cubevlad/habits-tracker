import { useLocation } from 'react-router-dom'

import { BUTTON_STATE } from '../../../lib'
import type { LinksMapValue } from '../../../model'

type UseButtonStateHookProps = {
  isDisabled: boolean
  mode: 'dark' | 'light'
  to: LinksMapValue
}

const getState = (state: number) => {
  let s = 0

  Object.keys(BUTTON_STATE).forEach((stateName) => {
    const value = BUTTON_STATE[stateName]

    if (value === state) {
      s = value
    }
  })

  return s
}

export const useLinkState = ({ isDisabled, mode, to }: UseButtonStateHookProps) => {
  const { pathname } = useLocation()

  const color = BUTTON_STATE[mode.toUpperCase()]
  const disabled = isDisabled ? BUTTON_STATE.DISABLED : 0
  const active = pathname === to ? BUTTON_STATE.ACTIVE : 0

  const initialState = color | disabled | active

  return getState(initialState)
}
