import { createContext, useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setAuth } from './store/auth'

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
  const [auth, setAuthState] = useState(getAuthFromLocalStorage())
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const login = (authData) => {
    setAuthState(authData)
    localStorage.setItem(AUTH_KEY, JSON.stringify(authData))
    navigate('/')
  }

  const logout = () => {
    setAuthState(null)
    localStorage.removeItem(AUTH_KEY)
    navigate('/')
  }

  useEffect(() => {
    dispatch(setAuth(auth))
  }, [auth, dispatch])

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
