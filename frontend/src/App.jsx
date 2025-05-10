import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import Signup from './components/signup'
import SignIn from './components/sign-in'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SignIn />
    </>
  )
}

export default App
