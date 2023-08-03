import Tracklist from '../../components/Tracklist'
import { useGetMainPlaylistQuery } from '../../api/playlist'

export default function MainPage() {
  const { data, error, isLoading } = useGetMainPlaylistQuery()

  return <Tracklist tracks={data} error={error} loading={isLoading} />
}
