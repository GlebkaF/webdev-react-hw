import NavMenu from '../../components/NavMenu/NavMenu'
import AudioPlayer from '../../components/AudioPlayer/AudioPlayer'
import SideBar from '../../components/SideBar'
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
const Main = styled.main`
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  max-height: 100%;
  height: 100%;
`

export default function PageLayout({ children }) {
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
          <Main>
            <NavMenu />
            {/* !!! Объяснить */}
            {/* {children} */}
            <Outlet></Outlet>
            <SideBar />
          </Main>
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
