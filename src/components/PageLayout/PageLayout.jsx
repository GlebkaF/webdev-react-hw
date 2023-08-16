import NavMenu from '../../components/NavMenu/NavMenu'
import SideBar from '../../components/SideBar'
import { styled } from 'styled-components'

const Main = styled.main`
  flex: 1 1 auto;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
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
