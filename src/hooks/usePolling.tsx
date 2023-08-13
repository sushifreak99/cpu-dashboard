import { useEffect, useRef } from 'react'

export function usePolling(callback: () => void, intervalMs: number) {
  const tid = useRef<NodeJS.Timer>()
  useEffect(() => {
    tid.current = setInterval(callback, intervalMs)
    return () => clearInterval(tid.current)
  }, [])
}
