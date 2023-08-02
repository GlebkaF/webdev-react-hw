import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../auth'

export default function ProtectedRoute() {
  const redirectPath = '/login'

  const { auth } = useAuth()
  if (!auth) {
    return <Navigate to={redirectPath} replace={true}></Navigate>
  }

  return <Outlet></Outlet>
}
