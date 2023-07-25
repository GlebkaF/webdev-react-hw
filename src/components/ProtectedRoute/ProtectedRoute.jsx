import { Navigate } from 'react-router-dom'
import { useAuth } from '../../auth'

export default function ProtectedRoute({ children, redirectPath = '/login' }) {
  const { auth } = useAuth()
  if (!auth) {
    return <Navigate to={redirectPath} replace={true}></Navigate>
  }
  return children
}
