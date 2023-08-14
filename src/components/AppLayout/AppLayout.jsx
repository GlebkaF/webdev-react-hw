import AudioPlayer from '../AudioPlayer/AudioPlayer'
import { useSelector } from 'react-redux'
import { styled } from 'styled-components'
import { Outlet } from 'react-router-dom'

const App = styled.div``
const Wrapper = styled.div`
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  background-color: #383838;
`
const Container = styled.div`
  max-width: 1920px;
  height: 100vh;
  margin: 0 auto;
  position: relative;
  background-color: #181818;
`

export default function AppLayout() {
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

  return (
    <App>
      <Wrapper>
        <Container>
          <Outlet></Outlet>
          {track ? (
            <AudioPlayer
              track={track.track}
              artist={track.artist}
              url={track.url}
            />
          ) : null}
        </Container>
      </Wrapper>
    </App>
  )
}
