import { useState } from 'react'
import * as S from './NavMenu.styles'
import { useNavigate } from 'react-router-dom'

export default function NavMenu({ isLoggedIn, setIsLoggedIn }) {
  const [open, setOpen] = useState(true)
  const navigator = useNavigate()

  return (
    <S.MainNav>
      <S.NavLogo>
        <S.LogoImage src="img/logo.png" alt="logo" />
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
              <S.MenuLink to="/favorites">Мой плейлист</S.MenuLink>
            </S.MenuItem>
            <S.MenuItem>
              {!isLoggedIn ? (
                <S.MenuLink to="/login">Войти</S.MenuLink>
              ) : (
                <S.MenuLink
                  onClick={(e) => {
                    e.preventDefault()
                    document.cookie.split(';').forEach(function (c) {
                      document.cookie = c
                        .replace(/^ +/, '')
                        .replace(
                          /=.*/,
                          '=;expires=' + new Date().toUTCString() + ';path=/',
                        )
                    })
                    setIsLoggedIn(false)
                    navigator('/login')
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
