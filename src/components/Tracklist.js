import { useEffect, useState } from 'react'
import Track from './Track'
import './Tracklist.css'
import CategoryItem from './CategoryItem/CategoryItem'
import { getTracks } from '../api'

const TracklistHeader = () => {
  return (
    <div className="content__title playlist-title">
      <div className="playlist-title__col col01">Трек</div>
      <div className="playlist-title__col col02">ИСПОЛНИТЕЛЬ</div>
      <div className="playlist-title__col col03">АЛЬБОМ</div>
      <div className="playlist-title__col col04">
        <svg className="playlist-title__svg" alt="time">
          <use xlinkHref="img/icon/sprite.svg#icon-watch"></use>
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
        <use xlinkHref="img/icon/sprite.svg#icon-search"></use>
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

export default function Tracklist({ setTrack }) {
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

  return (
    <div className="main__centerblock centerblock">
      <TracklistSerach></TracklistSerach>
      <h2 className="centerblock__h2">Треки</h2>
      <TracklistSearchBySelect></TracklistSearchBySelect>
      <div className="centerblock__content">
        <TracklistHeader></TracklistHeader>
        {error ? (
          <p>Не удалось загрузить плейлист, попробуйте позже: {error}</p>
        ) : null}
        <div className="content__playlist playlist">
          {loading
            ? [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                <Track key={item} isLoading={true}></Track>
              ))
            : tracks.map((track) => (
                <Track
                  key={track.id}
                  url={track.track_file}
                  track={track.name}
                  artist={track.author}
                  album={track.album}
                  time={
                    Math.floor(track.duration_in_seconds / 60)
                      .toString()
                      .padStart(2, '0') +
                    ':' +
                    (track.duration_in_seconds % 60).toString().padStart(2, '0')
                  }
                  setTrack={setTrack}
                ></Track>
              ))}
        </div>
      </div>
    </div>
  )
}
