import { useCallback, useEffect, useRef, useState } from 'react'
import './AudioPlayer.styles.js'
import * as S from './AudioPlayer.styles.js'
import { useDispatch, useSelector } from 'react-redux'
import {
  createPauseAction,
  createPlayAction,
  nextTrack,
  prevTrack,
  toggleShuffled,
} from '../../store/slice/audioplayer/actions.js'
import { useAuthSelector } from '../../auth.js'
import {
  useDislikeTrackMutation,
  useLikeTrackMutation,
} from '../../api/playlist.js'

function secondsToTimeString(seconds) {
  return (
    Math.floor(Math.round(seconds) / 60)
      .toString()
      .padStart(2, '0') +
    ':' +
    (Math.round(seconds) % 60).toString().padStart(2, '0')
  )
}

export default function AudioPlayer({ track }) {
  const audioRef = useRef(null)
  const auth = useAuthSelector()
  const [isLooped, setIsLooped] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const dispatch = useDispatch()
  const { shuffled, playing } = useSelector((store) => store.audioplayer)

  const url = track.track_file
  const name = track.name
  const artist = track.author

  const isTrackLiked = !!(track.stared_user ?? []).find(
    ({ id }) => id === auth.id,
  )

  const play = useCallback(() => {
    dispatch(createPlayAction())
  }, [dispatch])

  const pause = useCallback(() => {
    dispatch(createPauseAction())
  }, [dispatch])

  const toggleLoop = () => {
    if (isLooped) {
      setIsLooped(false)
      audioRef.current.loop = false
    } else {
      setIsLooped(true)
      audioRef.current.loop = true
    }
  }

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value
    setVolume(newVolume)
    audioRef.current.volume = newVolume
  }

  const handleSeek = (newTime) => {
    audioRef.current.currentTime = newTime
    play()
  }

  const handlePrevClick = () => {
    if (currentTime > 5) {
      handleSeek(0)
    } else {
      dispatch(prevTrack())
    }
  }

  const handleNextClick = useCallback(() => {
    dispatch(nextTrack())
  }, [dispatch])

  const [like, { error: likeError }] = useLikeTrackMutation()
  const [dislike, { error: dislikeError }] = useDislikeTrackMutation()

  const likeCurrentTrack = () => {
    like({
      id: track.id,
    })
  }
  const dislikeCurrentTrack = () => {
    dislike({
      id: track.id,
    })
  }

  useEffect(() => {
    const ref = audioRef.current

    // Сделал потише, просто чтобы не орала музыка
    ref.volume = 0.02

    setIsLooped(ref.loop)
    setVolume(ref.volume)

    const handleTimeUpdateEvent = (event) => {
      if (ref.currentTime && ref.duration) {
        setCurrentTime(ref.currentTime)
        setDuration(ref.duration)
      } else {
        setCurrentTime(0)
        setDuration(0)
      }
    }

    ref.addEventListener('timeupdate', handleTimeUpdateEvent)

    return () => {
      ref.removeEventListener('timeupdate', handleTimeUpdateEvent)
    }
  }, [])

  useEffect(() => {
    const handleSpacePress = (event) => {
      // Нажат пробел
      if (event.key === ' ') {
        event.preventDefault()
        if (playing) {
          pause()
        } else {
          play()
        }
      }
    }

    document.addEventListener('keypress', handleSpacePress)

    return () => {
      document.removeEventListener('keypress', handleSpacePress)
    }
  }, [play, pause, playing])

  useEffect(() => {
    const ref = audioRef.current
    if (playing) {
      ref.play()
    } else {
      ref.pause()
    }
  }, [playing, url])

  useEffect(() => {
    const ref = audioRef.current

    ref.addEventListener('ended', handleNextClick)
    return () => {
      ref.removeEventListener('ended', handleNextClick)
    }
  }, [handleNextClick])

  const error = likeError ?? dislikeError ?? null

  if (error) {
    console.error(error)
    alert(`Ошибка лайка: ${error.message}`)
  }

  return (
    <S.Bar>
      <S.HiddenAudio ref={audioRef} controls src={url} />

      <S.BarContent>
        <S.ProgressInfoContainer>
          <S.ProgressInfoTiming>
            {secondsToTimeString(currentTime)} / {secondsToTimeString(duration)}
          </S.ProgressInfoTiming>
        </S.ProgressInfoContainer>
        <S.ProgressInput
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          step={0.01}
          onChange={(event) => handleSeek(event.target.value)}
        ></S.ProgressInput>
        <S.PlayerBlock>
          <S.BarPlayer>
            <S.PlayerControls>
              <S.PlayerControlWithRightMargin>
                <S.PlayerSvgPrev alt="prev" onClick={handlePrevClick}>
                  <svg>
                    <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                  </svg>
                </S.PlayerSvgPrev>
              </S.PlayerControlWithRightMargin>
              <S.PlayerControlWithRightMargin className="_btn">
                {playing ? (
                  <S.PlayerSvgPlay onClick={pause} alt="play">
                    <svg
                      width="15"
                      height="19"
                      viewBox="0 0 15 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="5" height="19" fill="#D9D9D9" />
                      <rect x="10" width="5" height="19" fill="#D9D9D9" />
                    </svg>
                  </S.PlayerSvgPlay>
                ) : (
                  <S.PlayerSvgPlay onClick={play} alt="play">
                    <svg>
                      <use xlinkHref="/img/icon/sprite.svg#icon-play"></use>
                    </svg>
                  </S.PlayerSvgPlay>
                )}
              </S.PlayerControlWithRightMargin>
              <S.PlayerNextIcon>
                <S.PlayerSvgNext alt="next" onClick={handleNextClick}>
                  <svg>
                    <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                  </svg>
                </S.PlayerSvgNext>
              </S.PlayerNextIcon>
              <S.PlayerRepeatIcon className="_btn-icon" onClick={toggleLoop}>
                <S.PlayerSvgRepeat alt="repeat" $active={isLooped}>
                  <svg>
                    <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                  </svg>
                </S.PlayerSvgRepeat>
              </S.PlayerRepeatIcon>
              <S.PlayerShuffleIcon className="_btn-icon">
                <S.PlayerSvgShuffle
                  alt="shuffle"
                  $active={shuffled}
                  onClick={() => {
                    dispatch(toggleShuffled())
                  }}
                >
                  <svg>
                    <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
                  </svg>
                </S.PlayerSvgShuffle>
              </S.PlayerShuffleIcon>
            </S.PlayerControls>

            <S.TrackPlay>
              <S.TrackContain>
                <S.TrackPlayImage>
                  <S.TrackPlaySvg alt="music">
                    <svg>
                      <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                    </svg>
                  </S.TrackPlaySvg>
                </S.TrackPlayImage>
                <S.TrackPlayAuthor>
                  <S.TrackPlayAuthorLink href="http://">
                    <span>{name}</span>
                  </S.TrackPlayAuthorLink>
                </S.TrackPlayAuthor>
                <S.TrackPlayAlbum>
                  <S.TrackPlayAlbumLink href="http://">
                    <span>{artist}</span>
                  </S.TrackPlayAlbumLink>
                </S.TrackPlayAlbum>
              </S.TrackContain>

              <S.TrackPlayLikeDis>
                {!isTrackLiked ? (
                  <S.TrackLike className="_btn-icon" onClick={likeCurrentTrack}>
                    <S.TrackLikeSvg alt="like">
                      <svg>
                        <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                      </svg>
                    </S.TrackLikeSvg>
                  </S.TrackLike>
                ) : (
                  <S.TrackDislike
                    className="_btn-icon"
                    onClick={dislikeCurrentTrack}
                  >
                    <S.TrackLikeSvg alt="dislike">
                      <svg>
                        <use xlinkHref="/img/icon/sprite.svg#icon-dislike"></use>
                      </svg>
                    </S.TrackLikeSvg>
                  </S.TrackDislike>
                )}
              </S.TrackPlayLikeDis>
            </S.TrackPlay>
          </S.BarPlayer>
          <S.BarVolumeBlock>
            <S.VolumeContent>
              <S.VolumeImage>
                <S.VolumeSvg alt="volume">
                  <svg>
                    <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use>
                  </svg>
                </S.VolumeSvg>
              </S.VolumeImage>
              <S.VolumeProgress className="_btn">
                <S.ProgressInput
                  className="_btn"
                  type="range"
                  name="range"
                  value={volume}
                  max={1}
                  min={0}
                  step={0.01}
                  onChange={handleVolumeChange}
                  $color="white"
                />
              </S.VolumeProgress>
            </S.VolumeContent>
          </S.BarVolumeBlock>
        </S.PlayerBlock>
      </S.BarContent>
    </S.Bar>
  )
}
