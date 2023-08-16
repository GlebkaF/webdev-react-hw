import { styled } from 'styled-components'
import './CategoryItem.css'

const StyledNumberCircle = styled.div`
  color: white;
  background-color: #ad61ff;
  width: 26px;
  height: 26px;
  border-radius: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: -8px;
  top: -8px;
  font-family: StratosSkyeng;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 13px; /* 100% */
`

const StyledStrongItem = styled.strong`
  color: #b672ff;
`

export default function CategoryItem({
  selectedValues,
  setSelectedValues,
  isOpen,
  title,
  onClick,
  list,
  multipleСhoice = true,
  // Чтобы элементы интерфейса прижатые к правой части экрана не уезжали за экран
  openToLeft = false,
}) {
  const handleItemClick = (item) => {
    const index = selectedValues.indexOf(item)

    if (multipleСhoice) {
      if (index > -1) {
        setSelectedValues(selectedValues.toSpliced(index, 1))
      } else {
        setSelectedValues([...selectedValues, item])
      }
      return
    }

    setSelectedValues([item])
  }

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
        <div className={openToLeft ? 'filter-popup -to-left' : 'filter-popup'}>
          <ul className="filter-popup-list">
            {list.map((item) => {
              return (
                <li
                  key={item}
                  className="filter-popup-list-item"
                  onClick={() => handleItemClick(item)}
                >
                  {selectedValues.includes(item) ? (
                    <StyledStrongItem>{item}</StyledStrongItem>
                  ) : (
                    item
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      )}

      {selectedValues.length > 0 && !(selectedValues[0] === 'По умолчанию') ? (
        <StyledNumberCircle>{selectedValues.length}</StyledNumberCircle>
      ) : null}
    </div>
  )
}
