import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PageInfiniteScroll from './components/PageInfiniteScroll'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <PageInfiniteScroll/>
    </>
  )
}

export default App
