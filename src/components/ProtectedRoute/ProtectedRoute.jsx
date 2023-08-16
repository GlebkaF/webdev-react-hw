import { Navigate, Outlet } from 'react-router-dom'
import { useAuthSelector } from '../../auth'

export default function ProtectedRoute() {
  const redirectPath = '/login'

  const auth = useAuthSelector()

  if (!auth.id) {
    return <Navigate to={redirectPath} replace={true}></Navigate>
  }

  return <Outlet></Outlet>
}
