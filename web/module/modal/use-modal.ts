import { useEffect, useMemo } from "react"
import { Subject } from "rxjs"

export const useModal = () => {
  const closeSubject = useMemo(() => new Subject<void>(), [])
  const close = useMemo(() => () => closeSubject.next(), [])

  return {
    closeSubject,
    onClose: (callback: () => void) => {
      useEffect(() => {
        const subscription = closeSubject.subscribe(callback)

        return () => subscription.unsubscribe()
      }, [])
    },
    close,
  }
}
