import { useState } from 'react'
import * as S from './NavMenu.styles'
import { useLogout } from '../../auth'
import { Link } from 'react-router-dom'

export default function NavMenu() {
  const [open, setOpen] = useState(true)

  const logout = useLogout()

  return (
    <S.MainNav>
      <Link to="/">
        <S.NavLogo>
          <S.LogoImage src="/img/logo.png" alt="logo" />
        </S.NavLogo>
      </Link>
      <S.NavBurger onClick={() => setOpen(!open)}>
        <S.BurgerLine></S.BurgerLine>
        <S.BurgerLine></S.BurgerLine>
        <S.BurgerLine></S.BurgerLine>
      </S.NavBurger>

      {open ? (
        <S.NavMenu>
          <S.MenuList>
            <S.MenuItem>
              <S.MenuLink to="/">Главное</S.MenuLink>
            </S.MenuItem>
            <S.MenuItem>
              <S.MenuLink to="/favorites">Мои треки</S.MenuLink>
            </S.MenuItem>

            <S.MobileOnlyMenuItem>
              <S.MenuLink to="/category/1">Классическая музыка</S.MenuLink>
            </S.MobileOnlyMenuItem>
            <S.MobileOnlyMenuItem>
              <S.MenuLink to="/category/2">Электронная музыка</S.MenuLink>
            </S.MobileOnlyMenuItem>
            <S.MobileOnlyMenuItem>
              <S.MenuLink to="/category/3">Рок музыка</S.MenuLink>
            </S.MobileOnlyMenuItem>

            <S.MenuItem>
              <S.MenuLink
                onClick={(e) => {
                  e.preventDefault()
                  logout()
                }}
              >
                Выйти
              </S.MenuLink>
            </S.MenuItem>
          </S.MenuList>
        </S.NavMenu>
      ) : null}
    </S.MainNav>
  )
}
