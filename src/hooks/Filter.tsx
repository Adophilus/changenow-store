import { useEffect, useState } from 'react'

interface ReturnValue {
  state: Map<string, string[]>
  get: (key: string) => (string[] | undefined)
  getAll: () => string[]
  add: (key: string, value: string) => void
  remove: (key: string, value: string) => void
}

export default (filters: string[]): ReturnValue => {
  const [state, setState] = useState(new Map<string, string[]>())

  useEffect(() => {
    const newState = new Map<string, string[]>()
    for (const filter of filters) {
      newState.set(filter, [])
    }
    setState(newState)
  }, [])

  return {
    state,
    get (key: string) {
      return state.get(key)
    },
    getAll () {
      let filters: string[] = []
      for (const key of state.keys()) {
        filters = filters.concat(state.get(key) ?? [])
      }
      return filters
    },
    add (key: string, value: string) {
      const newState = new Map(state)
      newState.set(key, state.get(key)?.concat(value) ?? [])
      setState(newState)
    },
    remove (key: string, value: string) {
      const newState = new Map(state)
      newState.set(key, state.get(key)?.filter(_value => _value !== value) ?? [])
      setState(newState)
    }
  }
}
