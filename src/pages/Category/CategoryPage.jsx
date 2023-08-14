import { useParams } from 'react-router-dom'
import { useAuth } from '../../auth'

import Tracklist from '../../components/Tracklist'
import { useGetCategoryQuery } from '../../api/playlist'

export default function CategoryPage() {
  const params = useParams()

  const { auth, logout } = useAuth()
  const { data, error, isLoading } = useGetCategoryQuery({
    token: auth.access,
    id: params.id,
  })

  if (error?.status === 401) {
    logout()
    return null
  }

  console.log(data)

  const tracks = data?.items || []
  const name = data?.name || ''

  return (
    <Tracklist
      tracks={tracks}
      error={error}
      loading={isLoading}
      showSearchBar={false}
      title={name}
    />
  )
}
