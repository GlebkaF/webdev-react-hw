import { useState } from 'react'
import Track from './Track'
import './Tracklist.css'
import CategoryItem from './CategoryItem/CategoryItem'

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

export default function Tracklist({ isLoading = true }) {
  return (
    <div className="main__centerblock centerblock">
      <TracklistSerach></TracklistSerach>
      <h2 className="centerblock__h2">Треки</h2>
      <TracklistSearchBySelect></TracklistSearchBySelect>
      <div className="centerblock__content">
        <TracklistHeader></TracklistHeader>
        <div className="content__playlist playlist">
          {isLoading ? (
            [1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => (
              <Track isLoading={true}></Track>
            ))
          ) : (
            <>
              <Track
                track="Guilt"
                artist="Nero"
                album="Welcome Reality"
                time="4:44"
              ></Track>

              <Track
                track="Elektro"
                artist="Dynoro, Outwork, Mr. Gee"
                album="Elektro"
                time="2:22"
              />

              <Track
                track="I'm Fire"
                artist="Ali Bakgor"
                album="I'm Fire"
                time="2:22"
              />

              <Track
                track="Non Stop"
                artist="Стоункат, Psychopath"
                album="Non Stop"
                time="4:12"
              />

              <Track
                track="Run Run"
                artist="Jaded, Will Clarke, AR/CO"
                album="Run Run"
                time="2:54"
              />

              <Track
                track="Eyes on Fire"
                artist="Blue Foundation, Zeds Dead"
                album="Eyes on Fire"
                time="5:20"
              />

              <Track
                track="Mucho Bien"
                artist="HYBIT, Mr. Black, Offer Nissim, Hi Profile"
                album="Mucho Bien"
                time="3:41"
              />

              <Track
                track="Knives n Cherries"
                artist="minthaze"
                album="Captivating"
                time="1:48"
              />

              <Track
                track="How Deep Is Your Love"
                artist="Calvin Harris, Disciples"
                album="How Deep Is Your Love"
                time="3:32"
              />

              <Track
                track="Morena"
                artist="Tom Boxer"
                album="Soundz Made in Romania"
                time="3:36"
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
