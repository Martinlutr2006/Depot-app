import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'

const App = () => {
  return (
    <BrowserRouter>
    <div className='min h-screen'>
    <Routes>
    <Route path='/' element={<LoginPage/>}/>
    <Route path='/register' element={<RegisterPage/>}/>
    </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App