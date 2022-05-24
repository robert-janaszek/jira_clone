import { useState, useCallback } from "react"

export const useStateIsModified = <T,>(initialState: T) => {
  const [value, setValue] = useState(initialState)
  const [isModified, setModified] = useState(false)
  const setValueModified = useCallback((newValue: T) => {
    if (newValue !== initialState) {
      setValue(newValue)
      if (!isModified) {
        setModified(true)
      }
    }
  }, [isModified, initialState])
  const resetModified = useCallback(() => {
    setModified(false)
  }, [])
  const reset = useCallback(() => {
    setValue(initialState)
    setModified(false)
  }, [initialState]);

  return {
    value,
    setValue: setValueModified,
    isModified,
    resetModified,
    reset
  }
}
