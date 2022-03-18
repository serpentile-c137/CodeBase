import React from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Tutorial from './components/Tutorial'
import Compiler from './components/Compiler'
import About from './components/About'
import Logout from './components/Logout'
import './App.css'
import Errorpage from './components/Errorpage'

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="*" element={<Errorpage />} />
        <Route exact path='/' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='/tutorial' element={<Tutorial />} />
        <Route exact path='/compiler' element={<Compiler />} />
        <Route exact path='/about' element={<About />} />
        <Route exact path='/logout' element={<Logout />} />
      </Routes>
    </>
  )
}

export default App