import { act, renderHook } from '@testing-library/react'
import { expect } from 'vitest'

import { useRingBuffer } from './useRingBuffer'

test('ring buffer with buffer size 3', () => {
  const { result } = renderHook(() => useRingBuffer<string>(3))

  expect(result.current[0]).toStrictEqual([])
  act(() => {
    result.current[1]('a')
  })
  expect(result.current[0]).toStrictEqual(['a'])
  act(() => {
    result.current[1]('b')
  })
  expect(result.current[0]).toStrictEqual(['a', 'b'])
  act(() => {
    result.current[1]('c')
  })
  expect(result.current[0]).toStrictEqual(['a', 'b', 'c'])
  act(() => {
    result.current[1]('d')
  })
  expect(result.current[0]).toStrictEqual(['b', 'c', 'd'])
})

test('setting initial state that has more than buffer size', () => {
  const { result } = renderHook(() =>
    useRingBuffer<string>(2, ['a', 'b', 'c', 'd']),
  )
  expect(result.current[0]).toStrictEqual(['c', 'd'])
})

test('ring buffer with buffer size 3 and initial value', () => {
  const { result } = renderHook(() => useRingBuffer<string>(3, ['a', 'b']))

  expect(result.current[0]).toStrictEqual(['a', 'b'])
  act(() => {
    result.current[1]('c')
  })
  expect(result.current[0]).toStrictEqual(['a', 'b', 'c'])
  act(() => {
    result.current[1]('d')
  })
  expect(result.current[0]).toStrictEqual(['b', 'c', 'd'])
})

test('edge case:: ring buffer with buffer size 0', () => {
  const { result } = renderHook(() => useRingBuffer<string>(0, ['a', 'b']))

  expect(result.current[0]).toStrictEqual([])
  act(() => {
    result.current[1]('c')
  })
  expect(result.current[0]).toStrictEqual([])
})
