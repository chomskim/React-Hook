import { useState } from 'react'
import staticData from '../../static.json'
import { FaArrowRight } from 'react-icons/fa'

export default function BookablesList() {
  const [group, setGroup] = useState('Kit')
  const { bookables, sessions, days } = staticData

  const bookablesInGroup = bookables.filter((b) => b.group === group)
  const [bookableIndex, setBookableIndex] = useState(1)
  const groups = [...new Set(bookables.map((b) => b.group))]

  const bookable = bookablesInGroup[bookableIndex]

  const [hasDetails, setHasDetails] = useState(false)

  function nextBookable() {
    setBookableIndex((i) => (i + 1) % bookablesInGroup.length)
  }
  function changeBookable(selectedIndex) {
    setBookableIndex(selectedIndex)
    console.log(selectedIndex)
  }
  return (
    <>
      <div>
        <select
          value={group}
          onChange={(e) => {
            setGroup(e.target.value)
            setBookableIndex(0)
          }}
        >
          {groups.map((g) => (
            <option value={g} key={g}>
              {g}
            </option>
          ))}
        </select>
        <ul className='bookables items-list-nav'>
          {bookablesInGroup.map((b, i) => (
            <li key={b.id} className={i === bookableIndex ? 'selected' : null}>
              <button className='btn' onClick={() => changeBookable(i)}>
                {b.title}
              </button>
            </li>
          ))}
        </ul>
        <p>
          <button className='btn' onClick={nextBookable} autoFocus>
            <FaArrowRight />
            <span>Next</span>
          </button>
        </p>
      </div>
      {bookable && (
        <div className='bookable-details'>
          <div className='item'>
            <div className='item-header'>
              <h2>{bookable.title}</h2>
              <span className='controls'>
                <label>
                  <input type='checkbox' checked={hasDetails} onChange={() => setHasDetails((has) => !has)} />
                  Show Details
                </label>
              </span>
            </div>

            <p>{bookable.notes}</p>

            {hasDetails && (
              <div className='item-details'>
                <h3>Availability</h3>
                <div className='bookable-availability'>
                  <ul>
                    {bookable.days.sort().map((d) => (
                      <li key={d}>{days[d]}</li>
                    ))}
                  </ul>
                  <ul>
                    {bookable.sessions.map((s) => (
                      <li key={s}>{sessions[s]}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
