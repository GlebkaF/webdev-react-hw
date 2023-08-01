import { useSelector } from 'react-redux'
import './Track.css'

export default function Track({
  id,
  track,
  album,
  artist,
  time,
  isLoading,
  onClick,
}) {
  const { playing, track: currentTrack } = useSelector(
    (store) => store.audioplayer,
  )

  return (
    <div className="playlist__item">
      <div className="playlist__track track">
        <div className="track__title">
          <div className="track__title-image">
            {currentTrack && currentTrack?.id === id ? (
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
                {track} <span className="track__title-span"></span>
              </a>
            )}
          </div>
        </div>
        <div className="track__author">
          {isLoading ? (
            <div className="skeleton"></div>
          ) : (
            <a className="track__author-link" href="http://">
              {artist}
            </a>
          )}
        </div>
        <div className="track__album">
          {isLoading ? (
            <div className="skeleton"></div>
          ) : (
            <a className="track__album-link" href="http://">
              {album}
            </a>
          )}
        </div>
        <div className="track__time">
          <svg className="track__time-svg" alt="time">
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
