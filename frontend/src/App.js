import React from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Tutorial from './components/Tutorial'
import Compiler from './components/Compiler'
import './App.css'
import Errorpage from './components/Errorpage'

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<Errorpage />} />
        <Route exact path='/' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='/tutorial' element={<Tutorial />} />
        <Route exact path='/compiler' element={<Compiler />} />
        <Route element={<Errorpage />} />
      </Routes>
    </>
  )
}

export default App