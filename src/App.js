import { useState } from 'react'
import AppRoutes from './routes'

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    document.cookie.includes('token'),
  )

  return (
    <AppRoutes
      isLoggedIn={isLoggedIn}
      setIsLoggedIn={setIsLoggedIn}
    ></AppRoutes>
  )
}
