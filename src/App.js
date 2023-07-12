import { useEffect, useState } from 'react'
import './App.css'
import AudioPlayer from './components/AudioPlayer'
import NavMenu from './components/NavMenu'
import SideBar from './components/SideBar'
import Tracklist from './components/Tracklist'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 5000)
  }, [])

  return (
    <div className="app">
      <div className="wrapper">
        <div className="container">
          <main className="main">
            <NavMenu />
            <Tracklist isLoading={isLoading} />
            <SideBar isLoading={isLoading} />
          </main>
          <AudioPlayer isLoading={isLoading} />
        </div>
      </div>
    </div>
  )
}

export default App
