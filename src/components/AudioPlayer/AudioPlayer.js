import { useEffect, useRef, useState } from 'react'
import './AudioPlayer.styles.js'
import * as S from './AudioPlayer.styles.js'

function secondsToTimeString(seconds) {
  return (
    Math.floor(Math.round(seconds) / 60)
      .toString()
      .padStart(2, '0') +
    ':' +
    (Math.round(seconds) % 60).toString().padStart(2, '0')
  )
}

export default function AudioPlayer({
  isLoading,
  track = '',
  artist = '',
  url = '',
}) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLooped, setIsLooped] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)

  const play = () => {
    audioRef.current.play()
    setIsPlaying(true)
  }

  const pause = () => {
    audioRef.current.pause()
    setIsPlaying(false)
  }

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

  useEffect(() => {
    const ref = audioRef.current

    setIsLooped(audioRef.current.loop)
    setVolume(audioRef.current.volume)

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
    if (url) {
      play()
    }
  }, [url])

  const handleSeek = (event) => {
    audioRef.current.currentTime = event.target.value
    play()
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
          onChange={handleSeek}
        ></S.ProgressInput>
        <S.PlayerBlock>
          <S.BarPlayer>
            <S.PlayerControls>
              <S.PlayerControlWithRightMargin>
                <S.PlayerSvgPrev
                  alt="prev"
                  onClick={() => {
                    alert('Еще не реализовано')
                  }}
                >
                  <svg>
                    <use xlinkHref="img/icon/sprite.svg#icon-prev"></use>
                  </svg>
                </S.PlayerSvgPrev>
              </S.PlayerControlWithRightMargin>
              <S.PlayerControlWithRightMargin className="_btn">
                {isPlaying ? (
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
                      <use xlinkHref="img/icon/sprite.svg#icon-play"></use>
                    </svg>
                  </S.PlayerSvgPlay>
                )}
              </S.PlayerControlWithRightMargin>
              <S.PlayerNextIcon>
                <S.PlayerSvgNext
                  alt="next"
                  onClick={() => {
                    alert('Еще не реализовано')
                  }}
                >
                  <svg>
                    <use xlinkHref="img/icon/sprite.svg#icon-next"></use>
                  </svg>
                </S.PlayerSvgNext>
              </S.PlayerNextIcon>
              <S.PlayerRepeatIcon className="_btn-icon" onClick={toggleLoop}>
                <S.PlayerSvgRepeat alt="repeat" $active={isLooped}>
                  <svg>
                    <use xlinkHref="img/icon/sprite.svg#icon-repeat"></use>
                  </svg>
                </S.PlayerSvgRepeat>
              </S.PlayerRepeatIcon>
              <S.PlayerShuffleIcon className="_btn-icon">
                <S.PlayerSvgShuffle
                  alt="shuffle"
                  onClick={() => {
                    alert('Еще не реализовано')
                  }}
                >
                  <svg>
                    <use xlinkHref="img/icon/sprite.svg#icon-shuffle"></use>
                  </svg>
                </S.PlayerSvgShuffle>
              </S.PlayerShuffleIcon>
            </S.PlayerControls>

            <S.TrackPlay>
              <S.TrackContain>
                <S.TrackPlayImage>
                  <S.TrackPlaySvg alt="music">
                    <svg>
                      <use xlinkHref="img/icon/sprite.svg#icon-note"></use>
                    </svg>
                  </S.TrackPlaySvg>
                </S.TrackPlayImage>
                <S.TrackPlayAuthor>
                  <S.TrackPlayAuthorLink href="http://">
                    {isLoading ? (
                      <div className="skeleton"></div>
                    ) : (
                      <span>{track}</span>
                    )}
                  </S.TrackPlayAuthorLink>
                </S.TrackPlayAuthor>
                <S.TrackPlayAlbum>
                  <S.TrackPlayAlbumLink href="http://">
                    {isLoading ? (
                      <div className="skeleton"></div>
                    ) : (
                      <span>{artist}</span>
                    )}
                  </S.TrackPlayAlbumLink>
                </S.TrackPlayAlbum>
              </S.TrackContain>

              <S.TrackPlayLikeDis>
                <S.TrackLike
                  className="_btn-icon"
                  onClick={() => {
                    alert('Еще не реализовано')
                  }}
                >
                  <S.TrackLikeSvg alt="like">
                    <svg>
                      <use xlinkHref="img/icon/sprite.svg#icon-like"></use>
                    </svg>
                  </S.TrackLikeSvg>
                </S.TrackLike>
                <S.TrackDislike
                  className="_btn-icon"
                  onClick={() => {
                    alert('Еще не реализовано')
                  }}
                >
                  <S.TrackLikeSvg alt="dislike">
                    <svg>
                      <use xlinkHref="img/icon/sprite.svg#icon-dislike"></use>
                    </svg>
                  </S.TrackLikeSvg>
                </S.TrackDislike>
              </S.TrackPlayLikeDis>
            </S.TrackPlay>
          </S.BarPlayer>
          <S.BarVolumeBlock>
            <S.VolumeContent>
              <S.VolumeImage>
                <S.VolumeSvg alt="volume">
                  <svg>
                    <use xlinkHref="img/icon/sprite.svg#icon-volume"></use>
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
