import { Route, Routes } from 'react-router-dom'
import MainPage from './pages/Main/MainPage'
import LoginPage from './pages/Login/LoginPage'
import NotFoundPage from './pages/NotFound/NotFoundPage'
import FavoritesPage from './pages/Favorites/FavoritesPage'
import CategoryPage from './pages/Category/CategoryPage'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import RegisterPage from './pages/Register/RegisterPage'

export default function AppRoutes({ isLoggedIn, setIsLoggedIn }) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute isAllowed={isLoggedIn} redirectPath="/login">
            <MainPage
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            ></MainPage>
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/login"
        element={
          <LoginPage
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
          ></LoginPage>
        }
      ></Route>
      <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>

      <Route
        path="/category/:id"
        element={
          <ProtectedRoute isAllowed={isLoggedIn} redirectPath="/login">
            <CategoryPage></CategoryPage>
          </ProtectedRoute>
        }
      ></Route>

      <Route
        path="/favorites"
        element={
          <ProtectedRoute isAllowed={isLoggedIn} redirectPath="/login">
            <FavoritesPage></FavoritesPage>
          </ProtectedRoute>
        }
      ></Route>

      <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
    </Routes>
  )
}
