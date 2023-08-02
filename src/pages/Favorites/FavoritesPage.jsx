import { useGetMyPlaylistQuery } from '../../api/playlist'
import { useAuth } from '../../auth'
import Tracklist from '../../components/Tracklist'

export default function FavoritesPage() {
  const { auth, logout } = useAuth()
  const { data, error, isLoading } = useGetMyPlaylistQuery(auth.access)

  if (error?.status === 401) {
    logout()
    return null
  }

  return <Tracklist tracks={data} error={error} loading={isLoading} />
}
