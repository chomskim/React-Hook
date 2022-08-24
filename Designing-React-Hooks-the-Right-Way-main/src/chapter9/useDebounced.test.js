const { useState, useMemo, useEffect, useRef } = React

const fruites = ['apple', 'banana', 'blackberries', 'blueberries', 'strawberry', 'pineapple']

const useDebounced = (oldState, duration) => {
  const [state, dispatch] = useState(oldState)
  const invokeRef = useRef(null)

  useEffect(() => {
    invokeRef.current = setTimeout(() => {
      dispatch(oldState)
    }, duration)

    return () => {
      clearTimeout(invokeRef.current)
    }
  }, [oldState, duration])

  return state
}

const Title = () => {
  const [text, setText] = useState('')
  const query = useDebounced(text, 300)

  const matched = useMemo(() => {
    console.log('created', query)
    return fruites.filter((v) => v.includes(query))
  }, [query])

  const onType = (e) => {
    const v = e.target.value
    setText(v)
  }

  console.log('updated', text)
  return (
    <>
      <input value={text} onChange={onType} />
      <p>{matched.join('\t')}</p>
    </>
  )
}

const App = () => {
  return <Title />
}

const rootEl = document.getElementById('root')
ReactDOM.render(<App />, rootEl)
