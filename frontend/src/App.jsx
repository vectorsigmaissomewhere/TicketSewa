import React from 'react'
import Signup from './components/Auth/Signup'
import Login from './components/Auth/Login'
import Home from './components/Auth/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/' element={<Home />}/>
      </Routes>
    </Router>
  )
}

export default App
