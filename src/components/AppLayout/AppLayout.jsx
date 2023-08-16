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
    return store.audioplayer.track
  })

  return (
    <App>
      <Wrapper>
        <Container>
          <Outlet></Outlet>
          {track ? <AudioPlayer track={track} /> : null}
        </Container>
      </Wrapper>
    </App>
  )
}
