import { Route, Routes } from 'react-router-dom'
import MainPage from './pages/Main/MainPage'
import NotFoundPage from './pages/NotFound/NotFoundPage'
import FavoritesPage from './pages/Favorites/FavoritesPage'
import CategoryPage from './pages/Category/CategoryPage'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import AuthPage from './pages/Auth/AuthPage'

export default function AppRoutes({ isLoggedIn, setIsLoggedIn }) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
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
          <AuthPage
            isLoginMode={true}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
          ></AuthPage>
        }
      ></Route>
      <Route
        path="/register"
        element={
          <AuthPage
            isLoginMode={false}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
          ></AuthPage>
        }
      ></Route>

      <Route
        path="/category/:id"
        element={
          <ProtectedRoute>
            <CategoryPage></CategoryPage>
          </ProtectedRoute>
        }
      ></Route>

      <Route
        path="/favorites"
        element={
          <ProtectedRoute>
            <FavoritesPage></FavoritesPage>
          </ProtectedRoute>
        }
      ></Route>

      <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
    </Routes>
  )
}
