import './CategoryItem.css'

export default function CategoryItem({ isOpen, title, onClick, list }) {
  return (
    <div className="filter__button">
      <div
        className={
          isOpen
            ? 'category-button --active _btn-text'
            : 'category-button _btn-text'
        }
        onClick={onClick}
      >
        {title}
      </div>
      {!isOpen ? null : (
        <div className="filter-popup">
          <ul className="filter-popup-list">
            {list.map((item) => {
              return <li className="filter-popup-list-item">{item}</li>
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
