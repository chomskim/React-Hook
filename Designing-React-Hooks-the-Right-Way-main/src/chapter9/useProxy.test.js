const { useState } = React

const useProxy = (initialObj) => {
  const [, dispatch] = useState(initialObj)

  const [obj] = useState(
    new Proxy(initialObj, {
      get: function () {
        return Reflect.get(...arguments)
      },
      set: function (obj, prop, value) {
        if (obj[prop] !== value) {
          obj[prop] = value
          dispatch({ ...obj })
        }
        return true
      },
    })
  )

  return obj
}

const Text = ({ form }) => {
  const onChange = (e) => {
    form.text = e.target.value
  }

  return <input value={form.text} onChange={onChange} />
}

const Form = () => {
  const form = useProxy({ count: 0, text: '' })
  const onClick = () => {
    form.count++
  }

  return (
    <div>
      <h1>Count: {form.count}</h1>
      <button onClick={onClick}>+</button>
      <p>
        <Text form={form} />
      </p>
    </div>
  )
}

const App = () => {
  return <Form />
}

const rootEl = document.getElementById('root')
ReactDOM.render(<App />, rootEl)
