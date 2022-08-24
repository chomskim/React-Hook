const { useState, useEffect } = React

const useWindow = (size = 0) => {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth)
    }

    handleResize()

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [setWidth])

  return [width, width > size]
}

const Greeting = () => {
  const [, wide] = useWindow(600)

  return <h1>{wide ? 'Hello World' : 'Hello'}</h1>
}

const App = () => {
  return (
    <>
      <Greeting />
      <p>Drag the window size to see the difference</p>
    </>
  )
}

const rootEl = document.getElementById('root')
ReactDOM.render(<App />, rootEl)
