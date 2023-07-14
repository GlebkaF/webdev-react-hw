import { Link } from 'react-router-dom'
import './SideBar.css'
export default function SideBar({ isLoading }) {
  return (
    <div className="main__sidebar sidebar">
      <div className="sidebar__personal">
        <p className="sidebar__personal-name">Sergey.Ivanov</p>
        <div className="sidebar__avatar"></div>
      </div>
      <div className="sidebar__block">
        <div className="sidebar__list">
          {isLoading ? (
            [1, 2, 3].map((item) => {
              return (
                <div
                  key={item}
                  className="sidebar__item sidebar__item--skeleton"
                ></div>
              )
            })
          ) : (
            <>
              <div className="sidebar__item">
                <Link className="sidebar__link" to="/category/1">
                  <img
                    className="sidebar__img"
                    src="img/playlist01.png"
                    alt="day's playlist"
                  />
                </Link>
              </div>
              <div className="sidebar__item">
                <Link className="sidebar__link" to="/category/2">
                  <img
                    className="sidebar__img"
                    src="img/playlist02.png"
                    alt="day's playlist"
                  />
                </Link>
              </div>
              <div className="sidebar__item">
                <Link className="sidebar__link" to="/category/3">
                  <img
                    className="sidebar__img"
                    src="img/playlist03.png"
                    alt="day's playlist"
                  />
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
