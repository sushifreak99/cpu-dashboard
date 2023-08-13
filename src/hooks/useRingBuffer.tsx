import { useState } from 'react'

export function calculateLimits(bufferSize: number, arraySize: number) {
  return [Math.max(arraySize - bufferSize, 0), arraySize]
}

export function useRingBuffer<T>(bufferSize: number, initialState: T[] = []) {
  const [buffer, setBuffer] = useState<T[]>(
    initialState.slice(...calculateLimits(bufferSize, initialState.length)),
  )
  const push = (item: T) => {
    setBuffer((buffer) => {
      const newBuffer = [...buffer, item]
      return newBuffer.slice(...calculateLimits(bufferSize, newBuffer.length))
    })
  }
  return [buffer, push] as const
}
