import { useState } from 'react'
import * as S from './NavMenu.styles'
import { useAuth } from '../../auth'

export default function NavMenu() {
  const [open, setOpen] = useState(true)

  const { auth, logout } = useAuth()

  return (
    <S.MainNav>
      <S.NavLogo>
        <S.LogoImage src="/img/logo.png" alt="logo" />
      </S.NavLogo>
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
            <S.MenuItem>
              {!auth ? (
                <S.MenuLink to="/login">Войти</S.MenuLink>
              ) : (
                <S.MenuLink
                  onClick={(e) => {
                    e.preventDefault()
                    logout()
                  }}
                >
                  Выйти
                </S.MenuLink>
              )}
            </S.MenuItem>
          </S.MenuList>
        </S.NavMenu>
      ) : null}
    </S.MainNav>
  )
}
