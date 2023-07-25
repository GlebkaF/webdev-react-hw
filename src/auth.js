import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AUTH_KEY = 'auth'

function getAuthFromLocalStorage() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_KEY))
  } catch (error) {
    console.error(error)
    return null
  }
}

const AuthContext = createContext(null)

export const WithAuth = ({ children }) => {
  const [auth, setAuth] = useState(getAuthFromLocalStorage())
  const navigate = useNavigate()

  const login = (authData) => {
    setAuth(authData)
    localStorage.setItem(AUTH_KEY, JSON.stringify(authData))
    navigate('/')
  }

  const logout = () => {
    setAuth(null)
    localStorage.removeItem(AUTH_KEY)
    navigate('/')
  }

  return (
    <AuthContext.Provider
      value={{
        auth,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
