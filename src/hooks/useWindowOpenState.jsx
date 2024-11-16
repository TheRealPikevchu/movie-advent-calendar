import { useState, useEffect } from 'react'

const useWindowOpenState = (key, initialState) => {
  const [isOpen, setOpen] = useState(() => {
    const storedState = window.localStorage.getItem(key)
    return storedState ? JSON.parse(storedState) : initialState
  })

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(isOpen))
  }, [isOpen, key])

  return [isOpen, setOpen]
}

export default useWindowOpenState
