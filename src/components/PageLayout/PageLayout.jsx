import NavMenu from '../../components/NavMenu/NavMenu'
import SideBar from '../../components/SideBar'
import { styled } from 'styled-components'

const Main = styled.main`
  display: flex;
  justify-content: space-between;
  max-height: 100%;
  height: 100%;
  min-width: 840px;
  @media (width <= 1900px) {
    flex-direction: column;
  }
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
