import React from 'react'
import Game from './components/Game'
import Nav from './components/Nav'
import Foot from './components/Foot'

const App = () => {
  return (
    <div className='flex flex-col min-h-screen justify-between'>
      <div>
        <Nav/>
        <Game/>
      </div>
      <Foot/>
    </div>
  )
}

export default App