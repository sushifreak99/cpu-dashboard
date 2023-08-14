import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import fetch from 'cross-fetch'
import './index.css'
import './App.css'
import { Line } from 'react-chartjs-2'

import type { CpuLoad } from './cpuLoad/types'
import { usePolling } from './hooks/usePolling'
import { useRingBuffer } from './hooks/useRingBuffer'
import { DEFAULT_BUFFER_SIZE, DEFAULT_CPU_STATS_DELAY } from './utils/constants'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

const App = () => {
  const [timeLine, push] = useRingBuffer<CpuLoad>(DEFAULT_BUFFER_SIZE)
  usePolling(() => {
    fetch('http://localhost:3000/api/stats')
      .then((res) => res.json())
      .then((cpuLoad: CpuLoad) => push(cpuLoad))
  }, DEFAULT_CPU_STATS_DELAY)

  return (
    <main className="App">
      <p>{process.env.VERSION}</p>
      <div style={{ height: '600px', width: '1200px' }}>
        <Line
          options={{
            scales: {
              y: {
                max: 1,
                min: 0,
              },
            },
          }}
          data={{
            datasets: [
              {
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                borderColor: 'rgb(53, 162, 235)',
                data: timeLine.map((cpuLoad) => cpuLoad.value),
                label: 'CPU avg. load',
              },
            ],
            labels: timeLine.map((cpuLoad) =>
              new Date(cpuLoad.timestamp).getUTCSeconds(),
            ),
          }}
        />
      </div>
    </main>
  )
}

export default App
