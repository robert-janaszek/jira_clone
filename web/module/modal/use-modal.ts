import { useEffect, useMemo, useState } from "react"
import { Subject } from "rxjs"

export const useModal = (opened: boolean) => {
  const [isOpened, setOpened] = useState(opened)
  const closeSubject = useMemo(() => new Subject<void>(), [])
  const open = useMemo(() => () => setOpened(true), [])
  const close = useMemo(() => () => {
    setOpened(false)
    closeSubject.next()
  }, [])

  return {
    isOpened,
    closeSubject,
    onClose: (callback: () => void) => {
      useEffect(() => {
        const subscription = closeSubject.subscribe(callback)

        return () => subscription.unsubscribe()
      }, [])
    },
    open,
    close,
  }
}
