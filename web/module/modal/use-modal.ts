import { useEffect, useMemo } from "react"
import { Subject } from "rxjs"

export const useModal = () => {
  const closeSubject = useMemo(() => new Subject<void>(), [])
  const close = useMemo(() => () => closeSubject.next(), [])

  return {
    closeSubject,
    onClose: (callback: () => void) => {
      useEffect(() => {
        closeSubject.subscribe(callback)
      }, [])
    },
    close,
  }
}
