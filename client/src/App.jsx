import { Component, useState } from 'react'
import './App.css'
import Navbar from "./components/Navbar"
import Sidebar from './components/Sidebar'
import Main from "./components/Main"

function App() {

  return (
    <div className="flex h-screen">
      <Sidebar/>
      <div className='flex-1'>
        <Main/>
      </div>
    </div>
  )
}

export default App
