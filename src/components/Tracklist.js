import Track from './Track'
import './Tracklist.css'

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
  return (
    <div className="centerblock__filter filter">
      <div className="filter__title">Искать по:</div>
      <div className="filter__button button-author _btn-text">исполнителю</div>
      <div className="filter__button button-year _btn-text">году выпуска</div>
      <div className="filter__button button-genre _btn-text">жанру</div>
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

export default function Tracklist() {
  return (
    <div className="main__centerblock centerblock">
      <TracklistSerach></TracklistSerach>
      <h2 className="centerblock__h2">Треки</h2>
      <TracklistSearchBySelect></TracklistSearchBySelect>
      <div className="centerblock__content">
        <TracklistHeader></TracklistHeader>
        <div className="content__playlist playlist">
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
        </div>
      </div>
    </div>
  )
}
