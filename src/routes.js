import { Route, Routes } from 'react-router-dom'
import MainPage from './pages/Main/MainPage'
import NotFoundPage from './pages/NotFound/NotFoundPage'
import FavoritesPage from './pages/Favorites/FavoritesPage'
import CategoryPage from './pages/Category/CategoryPage'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import AuthPage from './pages/Auth/AuthPage'
import PageLayout from './components/PageLayout/PageLayout'

export default function AppRoutes({ isLoggedIn, setIsLoggedIn }) {
  return (
    <Routes>
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

      <Route element={<ProtectedRoute />}>
        <Route element={<PageLayout></PageLayout>}>
          <Route
            path="/"
            element={
              <MainPage
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              ></MainPage>
            }
          ></Route>
          <Route
            path="/category/:id"
            element={<CategoryPage></CategoryPage>}
          ></Route>
          <Route
            path="/favorites"
            element={<FavoritesPage></FavoritesPage>}
          ></Route>
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
    </Routes>
  )
}
