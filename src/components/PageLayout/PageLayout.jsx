import NavMenu from '../../components/NavMenu/NavMenu'
import SideBar from '../../components/SideBar'
import { styled } from 'styled-components'

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

export default function PageLayout({ children, showCategory = false }) {
  return (
    <Main>
      <NavMenu />
      {children}
      <SideBar showCategory={showCategory} />
    </Main>
  )
}
