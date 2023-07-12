import './App.css'
import AudioPlayer from './components/AudioPlayer'
import NavMenu from './components/NavMenu'
import SideBar from './components/SideBar'
import Tracklist from './components/Tracklist'

function App() {
  return (
    <div className="app">
      <div className="wrapper">
        <div className="container">
          <main className="main">
            <NavMenu />
            <Tracklist />
            <SideBar />
          </main>
          <AudioPlayer />
        </div>
      </div>
    </div>
  )
}

export default App
