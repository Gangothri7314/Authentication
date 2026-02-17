
import './App.css'
import Login from './pages/Login/Login'
import { Routes,Route } from 'react-router-dom'
import Signup from './pages/Registration/Registration.jsx'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword.jsx'

function App() {
  

  return (
    <>
    <Routes>
      <Route path='/' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/forgot-password' element={<ForgotPassword/>}/>

    </Routes>

    </>
  )
}

export default App
