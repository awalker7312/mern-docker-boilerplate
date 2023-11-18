import { useState, useEffect } from 'react'
import axios from 'axios'
import reactLogo from './assets/react.svg'
import bootstrapLogo from './assets/bootstrap.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from 'react-bootstrap';

function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState(null)

  useEffect(() => {
    axios.get('/api/hello')
      .then(response => {
        setData(response.data)
      })
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://react-bootstrap.github.io/" target="_blank" rel="noreferrer">
          <img src={bootstrapLogo} className="logo react" alt="React Bootstrap logo" />
        </a>
      </div>
      <h1>Vite + React + Bootstrap</h1>
      <div className="card">
        <Button variant="primary" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
        <p>
          {data}
        </p>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
