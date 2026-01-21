import { useState } from 'react'
import './App.css'

function App() {
  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    setCounter(counter + 1);
  }

  return (
    <>
      <h1>{counter}</h1>
      <button onClick={handleClick}>Increase</button>
    </>
  )
}

export default App
