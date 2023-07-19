import { useEffect, useState } from 'react'
import './MainPage.css'
// import NavMenu

import NavMenu from '../../components/NavMenu/NavMenu'
import Tracklist from '../../components/Tracklist'
import AudioPlayer from '../../components/AudioPlayer/AudioPlayer'
import SideBar from '../../components/SideBar'

export default function MainPage({ isLoggedIn, setIsLoggedIn }) {
  const [isLoading, setIsLoading] = useState(true)
  const [track, setTrack] = useState(null)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 300)
  }, [])

  return (
    <div className="app">
      <div className="wrapper">
        <div className="container">
          <main className="main">
            <NavMenu isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <Tracklist isLoading={isLoading} setTrack={setTrack} />
            <SideBar isLoading={isLoading} />
          </main>
          {track ? (
            <AudioPlayer
              isLoading={isLoading}
              track={track.track}
              artist={track.artist}
              url={track.url}
            />
          ) : null}
        </div>
      </div>
    </div>
  )
}
