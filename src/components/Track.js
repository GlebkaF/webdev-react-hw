import { useSelector } from 'react-redux'
import './Track.css'
import { useLikeTrackMutation } from '../api/playlist'
import { useAuth } from '../auth'

export default function Track({ track, isLoading, onClick }) {
  const time =
    Math.floor(track.duration_in_seconds / 60)
      .toString()
      .padStart(2, '0') +
    ':' +
    (track.duration_in_seconds % 60).toString().padStart(2, '0')

  const { playing, track: currentTrack } = useSelector(
    (store) => store.audioplayer,
  )
  const { auth, logout } = useAuth()

  const [like, { error }] = useLikeTrackMutation()

  const handleLikeClick = () => {
    like({
      id: track.id,
      token: auth.access,
    })
  }

  console.log({ error })

  if (error?.status === 401) {
    logout()
    return null
  }

  return (
    <div className="playlist__item">
      <div className="playlist__track track">
        <div className="track__title">
          <div className="track__title-image">
            {currentTrack && currentTrack?.id === track.id ? (
              <div
                className={playing ? 'playing-dot -playing' : 'playing-dot'}
              ></div>
            ) : (
              <svg className="track__title-svg" alt="music">
                <use xlinkHref="img/icon/sprite.svg#icon-note"></use>
              </svg>
            )}
          </div>
          <div className="track__title-text">
            {isLoading ? (
              <div className="skeleton"></div>
            ) : (
              <a
                className="track__title-link"
                href="#1"
                onClick={(event) => {
                  event.preventDefault()
                  onClick()
                }}
              >
                {track.name} <span className="track__title-span"></span>
              </a>
            )}
          </div>
        </div>
        <div className="track__author">
          {isLoading ? (
            <div className="skeleton"></div>
          ) : (
            <a className="track__author-link" href="http://">
              {track.author}
            </a>
          )}
        </div>
        <div className="track__album">
          {isLoading ? (
            <div className="skeleton"></div>
          ) : (
            <a className="track__album-link" href="http://">
              {track.album}
            </a>
          )}
        </div>
        <div className="track__time">
          <svg className="track__time-svg" alt="time" onClick={handleLikeClick}>
            <use xlinkHref="img/icon/sprite.svg#icon-like"></use>
          </svg>
          {isLoading ? (
            <span className="track__time-text">00:00</span>
          ) : (
            <span className="track__time-text">{time}</span>
          )}
        </div>
      </div>
    </div>
  )
}
