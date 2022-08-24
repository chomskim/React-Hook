const { useState, useEffect, useRef, useMemo } = React

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

async function fetch() {
  await wait(2000)
  return 'Hello World.'
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

const fn = () => fetch()
const Title = () => {
  const { data, loading } = useAsync(fn)

  if (loading) return 'loading...'
  if (!data) return null

  return <h1>{data}</h1>
}

const App = () => {
  return <Title />
}

const rootEl = document.getElementById('root')
ReactDOM.render(<App />, rootEl)
