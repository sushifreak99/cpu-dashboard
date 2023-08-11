import fetch from 'cross-fetch'
import { useEffect } from 'react'
import './index.css'
import './App.css'

const App = () => {

  useEffect(() => {
    fetch('http://localhost:3000/api/stats')
      .then((res) => res.json())
  }, [])

  return (
    <main className="App">
      <p>{process.env.VERSION}</p>
    </main>
  )
}

export default App
