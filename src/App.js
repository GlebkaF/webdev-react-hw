import { WithAuth } from './auth'
import AppRoutes from './routes'

export default function App() {
  return (
    <WithAuth>
      <AppRoutes></AppRoutes>
    </WithAuth>
  )
}
