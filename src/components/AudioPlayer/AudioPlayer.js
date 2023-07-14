import './AudioPlayer.styles.js'
import * as S from './AudioPlayer.styles.js'

export default function AudioPlayer({ isLoading }) {
  return (
    <S.Bar>
      <S.BarContent>
        <S.PlayerProgress></S.PlayerProgress>
        <S.PlayerBlock>
          <S.BarPlayer>
            <S.PlayerControls>
              <S.PlayerControlWithRightMargin>
                <S.PlayerSvgPrev alt="prev">
                  <svg>
                    <use xlinkHref="img/icon/sprite.svg#icon-prev"></use>
                  </svg>
                </S.PlayerSvgPrev>
              </S.PlayerControlWithRightMargin>
              <S.PlayerControlWithRightMargin className="_btn">
                <S.PlayerSvgPlay alt="play">
                  <svg>
                    <use xlinkHref="img/icon/sprite.svg#icon-play"></use>
                  </svg>
                </S.PlayerSvgPlay>
              </S.PlayerControlWithRightMargin>
              <S.PlayerNextIcon>
                <S.PlayerSvgNext alt="next">
                  <svg>
                    <use xlinkHref="img/icon/sprite.svg#icon-next"></use>
                  </svg>
                </S.PlayerSvgNext>
              </S.PlayerNextIcon>
              <S.PlayerRepeatIcon className="_btn-icon">
                <S.PlayerSvgRepeat alt="repeat">
                  <svg>
                    <use xlinkHref="img/icon/sprite.svg#icon-repeat"></use>
                  </svg>
                </S.PlayerSvgRepeat>
              </S.PlayerRepeatIcon>
              <S.PlayerShuffleIcon className="_btn-icon">
                <S.PlayerSvgShuffle alt="shuffle">
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
                    {isLoading ? <div className="skeleton"></div> : ' Ты та...'}
                  </S.TrackPlayAuthorLink>
                </S.TrackPlayAuthor>
                <S.TrackPlayAlbum>
                  <S.TrackPlayAlbumLink href="http://">
                    {isLoading ? <div className="skeleton"></div> : 'Баста'}
                  </S.TrackPlayAlbumLink>
                </S.TrackPlayAlbum>
              </S.TrackContain>

              <S.TrackPlayLikeDis>
                <S.TrackLike className="_btn-icon">
                  <S.TrackLikeSvg alt="like">
                    <svg>
                      <use xlinkHref="img/icon/sprite.svg#icon-like"></use>
                    </svg>
                  </S.TrackLikeSvg>
                </S.TrackLike>
                <S.TrackDislike className="_btn-icon">
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
                <S.VolumeProgressInput
                  className="_btn"
                  type="range"
                  name="range"
                />
              </S.VolumeProgress>
            </S.VolumeContent>
          </S.BarVolumeBlock>
        </S.PlayerBlock>
      </S.BarContent>
    </S.Bar>
  )
}
