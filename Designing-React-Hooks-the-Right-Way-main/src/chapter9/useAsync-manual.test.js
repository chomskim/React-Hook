const { useState, useEffect, useRef, useMemo } = React

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

async function fetch(_, id) {
  await wait(2000)
  return `Hello World + ${id}.`
}

const useAsync = (asyncFunc, initialParams = {}, immediate = true) => {
  const [loading, setLoading] = useState(immediate)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const mountedRef = useRef(true)

  const execute = useMemo(
    () => (params) => {
      setLoading(true)
      return asyncFunc({
        ...initialParams,
        ...params,
      })
        .then((res) => {
          if (!mountedRef.current) return null
          setData(res)
          setError(null)
          setLoading(false)
          return res
        })
        .catch((err) => {
          if (!mountedRef.current) return null
          setError(err)
          setLoading(false)
          throw err
        })
    },
    [asyncFunc, setData, setError, setLoading]
  )

  useEffect(() => {
    if (immediate) {
      execute(initialParams)
    }
  }, [immediate, execute])

  useEffect(() => {
    return () => {
      mountedRef.current = false
    }
  }, [mountedRef])

  return {
    execute,
    loading,
    data,
    error,
  }
}

const fn = ({ id }) => fetch('https://google.com', id)
const Title = () => {
  const { execute, data, loading } = useAsync(fn, {}, false)

  const onClick = (id) => () => {
    execute({ id })
  }

  if (loading) return 'loading...'

  return data ? <h1>{data}</h1> : <button onClick={onClick(3)}>Load 3</button>
}

const App = () => {
  return <Title />
}

const rootEl = document.getElementById('root')
ReactDOM.render(<App />, rootEl)
