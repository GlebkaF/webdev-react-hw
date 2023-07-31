import { useEffect, useState } from 'react'
import './MainPage.css'
import NavMenu from '../../components/NavMenu/NavMenu'
import Tracklist from '../../components/Tracklist'
import AudioPlayer from '../../components/AudioPlayer/AudioPlayer'
import SideBar from '../../components/SideBar'
import { useSelector } from 'react-redux'

export default function MainPage() {
  const [isLoading, setIsLoading] = useState(true)

  const track = useSelector((store) => {
    if (!store.audioplayer.track) {
      return null
    }
    return {
      url: store.audioplayer.track.track_file,
      track: store.audioplayer.track.name,
      artist: store.audioplayer.track.author,
    }
  })

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
            <NavMenu />
            <Tracklist />
            <SideBar isLoading={isLoading} />
          </main>
          {track ? (
            <AudioPlayer
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
