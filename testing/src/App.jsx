import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Edit from './components/Edit';
import LinkComponent from './components/LinkComponent';
import { FileContextProvider } from './components/FileContext'

function App() {
  
  return (
    <BrowserRouter>
      <FileContextProvider>
        <Routes>
          <Route path='/home' element={ <LinkComponent /> } />
          <Route path='/create/styles' element={ <Edit /> } />
        </Routes>
      </FileContextProvider>
    </BrowserRouter>
  )
}

export default App
