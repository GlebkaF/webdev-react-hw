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
                  <use xlinkHref="img/icon/sprite.svg#icon-prev"></use>
                </S.PlayerSvgPrev>
              </S.PlayerControlWithRightMargin>
              <S.PlayerControlWithRightMargin className="_btn">
                <S.PlayerSvgPlay alt="play">
                  <use xlinkHref="img/icon/sprite.svg#icon-play"></use>
                </S.PlayerSvgPlay>
              </S.PlayerControlWithRightMargin>
              <S.PlayerNextIcon>
                <S.PlayerSvgNext alt="next">
                  <use xlinkHref="img/icon/sprite.svg#icon-next"></use>
                </S.PlayerSvgNext>
              </S.PlayerNextIcon>
              <S.PlayerRepeatIcon className="_btn-icon">
                <S.PlayerSvgRepeat alt="repeat">
                  <use xlinkHref="img/icon/sprite.svg#icon-repeat"></use>
                </S.PlayerSvgRepeat>
              </S.PlayerRepeatIcon>
              <S.PlayerShuffleIcon className="_btn-icon">
                <S.PlayerSvgShuffle alt="shuffle">
                  <use xlinkHref="img/icon/sprite.svg#icon-shuffle"></use>
                </S.PlayerSvgShuffle>
              </S.PlayerShuffleIcon>
            </S.PlayerControls>

            <S.TrackPlay>
              <S.TrackContain>
                <S.TrackPlayImage>
                  <S.TrackPlaySvg alt="music">
                    <use xlinkHref="img/icon/sprite.svg#icon-note"></use>
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
                    <use xlinkHref="img/icon/sprite.svg#icon-like"></use>
                  </S.TrackLikeSvg>
                </S.TrackLike>
                <S.TrackDislike className="_btn-icon">
                  <S.TrackLikeSvg alt="dislike">
                    <use xlinkHref="img/icon/sprite.svg#icon-dislike"></use>
                  </S.TrackLikeSvg>
                </S.TrackDislike>
              </S.TrackPlayLikeDis>
            </S.TrackPlay>
          </S.BarPlayer>
          <S.BarVolumeBlock>
            <S.VolumeContent>
              <S.VolumeImage>
                <S.VolumeSvg alt="volume">
                  <use xlinkHref="img/icon/sprite.svg#icon-volume"></use>
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
