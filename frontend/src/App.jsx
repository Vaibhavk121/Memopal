import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import Signup from './components/signup'
//import SignIn from './components/sign-in'
//import ManageAccounts from './components/ManageAccounts'
import Landing from './components/Landing'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Landing />
    </>
  )
}

export default App
