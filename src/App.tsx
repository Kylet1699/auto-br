import React from 'react'
import logo from './logo.svg'
import './App.css'
import phaserGame from './PhaserGame'
import HelloWorldScene from './scenes/Game'

const handleClick = () => {
  const scene = phaserGame.scene.keys.helloworld as HelloWorldScene
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <button className="App-button" onClick={handleClick}>
          click me
        </button> */}
      </header>
    </div>
  )
}

export default App
