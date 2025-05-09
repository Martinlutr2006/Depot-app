import React from 'react'
import { BrowserRouter, Route } from "react-router-dom"

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<LoginPage}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App