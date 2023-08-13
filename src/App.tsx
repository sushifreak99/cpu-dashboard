import fetch from 'cross-fetch'

import './index.css'
import './App.css'
import type { CpuLoad } from './cpuLoad/types'
import { usePolling } from './hooks/usePolling'
import { useRingBuffer } from './hooks/useRingBuffer'
import { BUFFER_SIZE, CPU_STATS_DELAY } from './utils/constants'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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
      <div style={{width: '1200px', height: '600px'}}>
      <Line
        options={{
          scales: {
            y: {
              max: 1.01,
              min: 0,
            }
          }
        }}
        data={{
          labels: buffer.map(cpuLoad => new Date(cpuLoad.timestamp).toISOString()),
          datasets: [{
            label: 'CPU avg. load',
            data: buffer.map(cpuLoad => cpuLoad.value),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          }],
        }}
      />
      </div>
    </main>
  )
}

export default App
