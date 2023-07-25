import { Link } from 'react-router-dom'
import './SideBar.css'
import { useAuth } from '../auth'

export default function SideBar({ isLoading }) {
  const { auth, logout } = useAuth()
  return (
    <div className="main__sidebar sidebar">
      <div className="sidebar__personal">
        <p className="sidebar__personal-name">{auth.username ?? auth.email}</p>
        <div className="sidebar__avatar" onClick={logout}>
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M25.6711 16.046V14.7419C25.6711 13.2276 24.4435 12 22.9292 12H16.7419C15.2276 12 14 13.2276 14 14.7419V26.0645C14 27.5788 15.2276 28.8065 16.7419 28.8065H22.9292C24.4435 28.8065 25.6711 27.5788 25.6711 26.0645V24.6048M18.3572 20.3254H33.2963M33.2963 20.3254L30.1062 23.5155M33.2963 20.3254L30.1062 17.1353"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="20" cy="20" r="19.5" stroke="white" />
          </svg>
        </div>
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
