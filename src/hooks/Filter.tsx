import { useEffect, useState } from 'react'

export default (states) => {
  const [state, setState] = useState({})

  useEffect(() => {
    const newState = {}
    for (const s of states) {
      newState[s] = []
    }
    setState(newState)
  }, [])

  return {
    state,
    get(key) {
      return state[key]
    },
    getAll() {
      let filters = []
      for (const key in state) {
        filters = filters.concat(state[key])
      }
      return filters
    },
    add(key, value) {
      if (!state[key].find((v) => v === value))
        setState({ ...state, [key]: state[key].concat(value) })
    },
    remove(key, value) {
      setState({ ...state, [key]: state[key].filter((v) => v !== value) })
    }
  }
}
