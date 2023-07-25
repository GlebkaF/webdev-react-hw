import { Link } from 'react-router-dom'
import * as S from './AuthPage.styles'
import { login, register } from '../../api'
import { useAuth } from '../../auth'
import { useState } from 'react'

export default function AuthPage({ isLoginMode = false }) {
  const auth = useAuth()

  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')

  const handleLogin = async ({ email, password }) => {
    if (email.length === 0) {
      setError('Не заполнена почта')
      return
    }

    if (password.length === 0) {
      setError('Не заполнен пароль')
      return
    }

    try {
      setError(null)
      setIsLoading(true)

      const loginData = await login({ email, password })

      auth.login(loginData)
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async () => {
    if (email.length === 0) {
      setError('Не заполнена почта')
      return
    }

    if (password.length === 0) {
      setError('Не заполнен пароль')
      return
    }
    if (password !== repeatPassword) {
      setError('Пароли не совпадают')
      return
    }

    try {
      setError(null)
      setIsLoading(true)

      await register({ email, password })
      handleLogin({ email, password })
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <S.PageContainer>
      <S.ModalForm>
        <Link to="/">
          <S.ModalLogo>
            <S.ModalLogoImage src="/img/logo_modal.png" alt="logo" />
          </S.ModalLogo>
        </Link>
        {isLoginMode ? (
          <>
            <S.Inputs>
              <S.ModalInput
                type="text"
                name="login"
                placeholder="Почта"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)
                }}
              />
              <S.ModalInput
                type="password"
                name="password"
                placeholder="Пароль"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value)
                }}
              />
            </S.Inputs>
            {error && <S.Error>{error}</S.Error>}
            <S.Buttons>
              <S.PrimaryButton
                onClick={() => handleLogin({ email, password })}
                disabled={isLoading}
              >
                Войти
              </S.PrimaryButton>
              <Link to="/register">
                <S.SecondaryButton>Зарегистрироваться</S.SecondaryButton>
              </Link>
            </S.Buttons>
          </>
        ) : (
          <>
            <S.Inputs>
              <S.ModalInput
                type="text"
                name="login"
                placeholder="Почта"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)
                }}
              />
              <S.ModalInput
                type="password"
                name="password"
                placeholder="Пароль"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value)
                }}
              />
              <S.ModalInput
                type="password"
                name="repeat-password"
                placeholder="Повторите пароль"
                value={repeatPassword}
                onChange={(event) => {
                  setRepeatPassword(event.target.value)
                }}
              />
            </S.Inputs>
            {error && <S.Error>{error}</S.Error>}
            <S.Buttons>
              <S.PrimaryButton onClick={handleRegister} disabled={isLoading}>
                Зарегистрироваться
              </S.PrimaryButton>
            </S.Buttons>
          </>
        )}
      </S.ModalForm>
    </S.PageContainer>
  )
}
