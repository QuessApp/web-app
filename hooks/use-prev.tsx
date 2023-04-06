import { useCallback, useRef } from "react"

export const usePrevious = <T,>() => {
  const ref = useRef<T | null>(null)

  const getPrev = useCallback((value: T) => {
    ref.current = value

    return ref.current
  }, [])

  return { ref, getPrev }
}
