import { useState } from 'react'
import Track from './Track'
import './Tracklist.css'
import CategoryItem from './CategoryItem/CategoryItem'
import { useDispatch } from 'react-redux'
import { setCurrentTrack } from '../store/slice/audioplayer/actions'
import { useAuth } from '../auth'

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
          <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
        </svg>
      </div>
    </div>
  )
}

const TracklistSearchBySelect = () => {
  const [selectedCategory, setSelectedCategory] = useState(null)

  const artists = [
    'Nero',
    'Dynoro, Outwork, Mr. Gee',
    'Ali Bakgor',
    'Стоункат, Psychopath',
    'Jaded, Will Clarke, AR/CO',
    'Blue Foundation, Zeds Dead',
    'HYBIT, Mr. Black, Offer Nissim, Hi Profile',
    'minthaze',
    'Calvin Harris, Disciples',
    'Tom Boxer',
  ]
  const years = ['1992', '1993', '1994']
  const genres = [
    'Рок',
    'Хип-Хоп',
    'Поп-музыка',
    'Техно',
    'Инди',
    'Метал',
    'Классическая музыка',
  ]

  const selectCategory = (category) => {
    if (category === selectedCategory) {
      setSelectedCategory(null)
      return
    }
    setSelectedCategory(category)
  }

  return (
    <div className="centerblock__filter filter">
      <div className="filter__title">Искать по:</div>
      <CategoryItem
        title="исполнителю"
        onClick={() => selectCategory('artist')}
        isOpen={selectedCategory === 'artist'}
        list={artists}
      ></CategoryItem>
      <CategoryItem
        title="году выпуска"
        onClick={() => selectCategory('year')}
        isOpen={selectedCategory === 'year'}
        list={years}
      ></CategoryItem>
      <CategoryItem
        title="жанру"
        onClick={() => selectCategory('genre')}
        isOpen={selectedCategory === 'genre'}
        list={genres}
      ></CategoryItem>
    </div>
  )
}

const TracklistSerach = () => {
  return (
    <div className="centerblock__search search">
      <svg className="search__svg">
        <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
      </svg>
      <input
        className="search__text"
        type="search"
        placeholder="Поиск"
        name="search"
      />
    </div>
  )
}

export default function Tracklist({
  error,
  loading,
  tracks,
  showAllTracksAsLiked = false,
  showSearchBar = true,
  title = 'Треки',
}) {
  const dispatch = useDispatch()
  const { auth } = useAuth()

  if (error) {
    return (
      <h3>
        Не удалось загрузить плейлист, попробуйте позже:{' '}
        {JSON.stringify(error.data, null, 2)}
      </h3>
    )
  }
  return (
    <div className="main__centerblock centerblock">
      <TracklistSerach></TracklistSerach>
      <h2 className="centerblock__h2">{title}</h2>
      {showSearchBar && <TracklistSearchBySelect></TracklistSearchBySelect>}
      <div className="centerblock__content">
        <TracklistHeader></TracklistHeader>
        <div className="content__playlist playlist">
          {loading ? (
            [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
              <Track key={item} track={{}} isLoading={true}></Track>
            ))
          ) : tracks.length > 0 ? (
            tracks.map((track) => (
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
            <h2>В этом плейлисте нет треков</h2>
          )}
        </div>
      </div>
    </div>
  )
}
