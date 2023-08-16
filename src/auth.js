import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setAuth } from './store/auth'

export const useLogout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  return () => {
    dispatch(setAuth(null))
    navigate('/login')
  }
}

export const useAuthSelector = () => {
  const auth = useSelector((store) => store.auth)
  return auth
}
