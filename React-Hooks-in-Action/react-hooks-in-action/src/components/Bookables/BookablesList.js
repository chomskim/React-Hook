import { Link, useNavigate } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'

export default function BookablesList({ bookable, bookables, getUrl }) {
  const group = bookable?.group
  const bookablesInGroup = bookables.filter((b) => b.group === group)
  const groups = [...new Set(bookables.map((b) => b.group))]

  const navigate = useNavigate()
  // useEffect(() => {
  //   timerRef.current = setInterval(() => {
  //     dispatch({ type: 'NEXT_BOOKABLE' })
  //   }, 3000)

  //   return stopPresentation
  // }, [dispatch])
  // function stopPresentation() {
  //   clearInterval(timerRef.current)
  // }

  function changeGroup(e) {
    const bookablesInSelectedGroup = bookables.filter((b) => b.group === e.target.value)
    navigate(getUrl(bookablesInSelectedGroup[0].id))
  }

  // function changeBookable(selectedBookable) {
  //   setBookable(selectedBookable)
  //   nextButtonRef.current.focus()
  // }

  function nextBookable() {
    const i = bookablesInGroup.indexOf(bookable)
    const nextIndex = (i + 1) % bookablesInGroup.length
    const nextBookable = bookablesInGroup[nextIndex]
    navigate(getUrl(nextBookable.id))
  }

  // if (status === 'error') {
  //   return <p>{error.message}</p>
  // }

  // if (status === 'loading') {
  //   return (
  //     <p>
  //       <Spinner /> Loading bookables...
  //     </p>
  //   )
  // }

  return (
    <div>
      <select value={group} onChange={changeGroup}>
        {groups.map((g) => (
          <option value={g} key={g}>
            {g}
          </option>
        ))}
      </select>

      <ul className='bookables items-list-nav'>
        {bookablesInGroup.map((b) => (
          <li key={b.id} className={b.id === bookable.id ? 'selected' : null}>
            <Link to={getUrl(b.id)} className='btn' replace={true}>
              {b.title}
            </Link>
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
  )
}
