import { useState } from 'react'
import Track from './Track'
import './Tracklist.css'
import CategoryItem from './CategoryItem/CategoryItem'
import { useDispatch } from 'react-redux'
import { setCurrentTrack } from '../store/slice/audioplayer/actions'
import { useAuthSelector } from '../auth'
import { styled } from 'styled-components'
import { compareAsc, compareDesc } from 'date-fns'

const StyledFiltersContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const TracklistHeader = () => {
  return (
    <div className="content__title playlist-title">
      <div className="playlist-title__col " style={{ width: '447px' }}>
        Трек
      </div>
      <div className="playlist-title__col " style={{ width: '321px' }}>
        ИСПОЛНИТЕЛЬ
      </div>
      <div className="playlist-title__col " style={{ width: '245px' }}>
        АЛЬБОМ
      </div>
      <div
        className="playlist-title__col "
        style={{ width: '60px', textAlign: 'end' }}
      >
        <svg className="playlist-title__svg" alt="time">
          <use xlinkHref="/webdev-react-hw/img/icon/sprite.svg#icon-watch"></use>
        </svg>
      </div>
    </div>
  )
}

const DEFAULT_SORT_VALUE = 'По умолчанию'
const ASC_SORT_VALUE = 'Сначала старые'
const DESC_SORT_VALUE = 'Сначала новые'

export default function Tracklist({
  error,
  loading,
  tracks = [],
  showAllTracksAsLiked = false,
  showSearchBar = true,
  title = 'Треки',
}) {
  const dispatch = useDispatch()
  const auth = useAuthSelector()
  const [searchQ, setSearchQ] = useState('')

  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedYears, setSelectedYears] = useState([DEFAULT_SORT_VALUE])
  const [selectedGenres, setSelectedGenres] = useState([])
  const [selectedArtists, setSelectedArtists] = useState([])

  const uniq = (value, index, array) => array.indexOf(value) === index

  const years = [DEFAULT_SORT_VALUE, ASC_SORT_VALUE, DESC_SORT_VALUE]

  const genres = tracks
    .map(({ genre }) => genre)
    .filter((i) => i)
    .filter(uniq)
    .sort()

  const artists = tracks
    .map(({ author }) => author ?? 'Неизвестный исполнитель')
    .filter((i) => i)
    .filter(uniq)
    .sort()

  const selectCategory = (category) => {
    if (category === selectedCategory) {
      setSelectedCategory(null)
      return
    }
    setSelectedCategory(category)
  }

  if (error) {
    return (
      <h3>
        Не удалось загрузить плейлист, попробуйте позже:{' '}
        {JSON.stringify(error.data, null, 2)}
      </h3>
    )
  }

  const filterTracks = () => {
    let filteredTracks = tracks

    if (selectedGenres.length > 0) {
      filteredTracks = filteredTracks.filter(({ genre }) =>
        selectedGenres.includes(genre),
      )
    }

    if (selectedArtists.length > 0) {
      filteredTracks = filteredTracks.filter(({ author }) =>
        selectedArtists.includes(author),
      )
    }

    if (selectedYears[0] === ASC_SORT_VALUE) {
      filteredTracks = [...filteredTracks].sort((a, b) =>
        compareAsc(new Date(a.release_date), new Date(b.release_date)),
      )
    }

    if (selectedYears[0] === DESC_SORT_VALUE) {
      filteredTracks = [...filteredTracks].sort((a, b) =>
        compareDesc(new Date(a.release_date), new Date(b.release_date)),
      )
    }

    if (searchQ.length > 0) {
      filteredTracks = filteredTracks.filter(({ name }) =>
        name.toLocaleLowerCase().includes(searchQ.toLocaleLowerCase()),
      )
    }

    return filteredTracks
  }

  const filteredTracks = filterTracks()

  return (
    <div className="main__centerblock centerblock">
      <div className="centerblock__search search">
        <svg className="search__svg">
          <use xlinkHref="/webdev-react-hw/img/icon/sprite.svg#icon-search"></use>
        </svg>
        <input
          className="search__text"
          type="search"
          placeholder="Поиск"
          name="search"
          value={searchQ}
          onChange={(e) => setSearchQ(e.target.value)}
        />
      </div>
      <h2 className="centerblock__h2">{title}</h2>
      {showSearchBar && (
        <StyledFiltersContainer>
          <div className="centerblock__filter filter">
            <div className="filter__title">Искать по:</div>
            <CategoryItem
              title="исполнителю"
              onClick={() => selectCategory('artist')}
              isOpen={selectedCategory === 'artist'}
              list={artists}
              selectedValues={selectedArtists}
              setSelectedValues={setSelectedArtists}
            ></CategoryItem>
            <CategoryItem
              title="жанру"
              onClick={() => selectCategory('genre')}
              isOpen={selectedCategory === 'genre'}
              list={genres}
              selectedValues={selectedGenres}
              setSelectedValues={setSelectedGenres}
            ></CategoryItem>
          </div>
          <div className="centerblock__filter filter">
            <div className="filter__title">Сортировка:</div>
            <CategoryItem
              title={selectedYears[0]}
              onClick={() => selectCategory('year')}
              isOpen={selectedCategory === 'year'}
              list={years}
              selectedValues={selectedYears}
              setSelectedValues={setSelectedYears}
              multipleСhoice={false}
              openToLeft={true}
            ></CategoryItem>
          </div>
        </StyledFiltersContainer>
      )}
      <div className="centerblock__content">
        <TracklistHeader></TracklistHeader>
        <div className="content__playlist">
          {loading ? (
            [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
              <Track key={item} track={{}} isLoading={true}></Track>
            ))
          ) : tracks.length > 0 ? (
            filteredTracks.length > 0 ? (
              filteredTracks.map((track) => (
                <Track
                  key={track.id}
                  track={track}
                  isLiked={
                    showAllTracksAsLiked
                      ? true
                      : !!(track.stared_user ?? []).find(
                          ({ id }) => id === auth.id,
                        )
                  }
                  onClick={() => {
                    dispatch(
                      setCurrentTrack({
                        playlist: tracks,
                        track: track,
                      }),
                    )
                  }}
                ></Track>
              ))
            ) : (
              <h2>Ничего не найдено *_*</h2>
            )
          ) : (
            <h2>В этом плейлисте нет треков</h2>
          )}
        </div>
      </div>
    </div>
  )
}
