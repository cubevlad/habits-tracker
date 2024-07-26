import { useState, useCallback, useMemo } from 'react'

export const useBoolean = (initialValue = false) => {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(() => setValue((prev) => !prev), [])
  const setTrue = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false), [])

  return useMemo(() => ({ value, toggle, setTrue, setFalse }), [value, toggle, setTrue, setFalse])
}
