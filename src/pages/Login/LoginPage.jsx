import { Link, useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
`

const StyledButton = styled.button`
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 20px;
  padding: 10px 30px;
`

const StyledLink = styled(Link)`
  font-size: 20px;
  color: white;
  text-decoration: underline;
`

export default function LoginPage({ setIsLoggedIn }) {
  const navigate = useNavigate()
  const handleLogin = () => {
    document.cookie = 'token=value; SameSite=None; Secure'
    setIsLoggedIn(true)
    navigate('/')
  }
  return (
    <StyledContainer>
      <h1>Страница логина</h1>
      <StyledButton onClick={handleLogin}>Войти</StyledButton>
      <StyledLink to="/register">Перейти к регистрации</StyledLink>
    </StyledContainer>
  )
}
