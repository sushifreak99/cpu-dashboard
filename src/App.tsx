import fetch from 'cross-fetch'

import './index.css'
import './App.css'
import { usePolling } from './hooks/usePolling'

const App = () => {
  usePolling(() => {
    fetch('http://localhost:3000/api/stats')
      .then((res) => res.json())
      .then(console.log)
  }, 4000)

  return (
    <main className="App">
      <p>{process.env.VERSION}</p>
    </main>
  )
}

export default App
