import { useState } from "react"
import { CpuLoad } from "../cpuLoad/types"
import { DEFAULT_BUFFER_SIZE, DEFAULT_CPU_STATS_DELAY } from "../utils/constants"
import { usePolling } from "./usePolling"
import { useRingBuffer } from "./useRingBuffer"

export function useAlaramState() {
  const [alarmState, setAlarmState] = useState('OK')
  const [timeLine, timeLinePush] = useRingBuffer<CpuLoad>(DEFAULT_BUFFER_SIZE)
  const [errTimeLine, errPush] = useRingBuffer<CpuLoad['timestamp']>(DEFAULT_BUFFER_SIZE);
  usePolling(() => {
    fetch('http://localhost:3000/api/stats')
      .then((res) => res.json())
      .then((cpuLoad: CpuLoad) => {
        timeLinePush(cpuLoad)
      })
  }, DEFAULT_CPU_STATS_DELAY)

}
