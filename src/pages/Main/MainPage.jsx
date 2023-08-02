import { useEffect, useState } from 'react'
import Tracklist from '../../components/Tracklist'
import { getTracks } from '../../api'

export default function MainPage() {
  const [loading, setLoading] = useState(false)
  const [tracks, setTracks] = useState([])
  const [error, setError] = useState('')

  const fetchTracks = async () => {
    try {
      setLoading(true)
      setError('')
      const tracks = await getTracks()
      setTracks(tracks)
    } catch (error) {
      console.error(error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTracks()
  }, [])

  return <Tracklist tracks={tracks} error={error} loading={loading} />
}
