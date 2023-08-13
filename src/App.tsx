import fetch from 'cross-fetch'

import './index.css'
import './App.css'
import type { CpuLoad } from './cpuLoad/types'
import { usePolling } from './hooks/usePolling'
import { useRingBuffer } from './hooks/useRingBuffer'
import { BUFFER_SIZE, CPU_STATS_DELAY } from './utils/constants'

const App = () => {
  const [buffer, push] = useRingBuffer<CpuLoad>(BUFFER_SIZE)
  usePolling(() => {
    fetch('http://localhost:3000/api/stats')
      .then((res) => res.json())
      .then((cpuLoad: CpuLoad) => push(cpuLoad))
  }, CPU_STATS_DELAY)

  return (
    <main className="App">
      <p>{process.env.VERSION}</p>
      {buffer.map((cpuLoad) => (
        <div key={cpuLoad.timestamp}>{cpuLoad.value}</div>
      ))}
    </main>
  )
}

export default App
