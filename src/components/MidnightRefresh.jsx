import { useState, useEffect } from 'react'

const MidnightRefresh = () => {
  const [nowHour, setNowHour] = useState(new Date().getHours())
  const [nowMinuts, setNowMinuts] = useState(new Date().getMinutes())
  const [nowSeconds, setNowSecunds] = useState(new Date().getSeconds())

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date()
      setNowHour(now.getHours())
      setNowMinuts(now.getMinutes())
      setNowSecunds(now.getSeconds())

      if (nowHour === 23 && nowMinuts === 59) {
        window.location.reload()
      }
    }, 1000)

    return () => clearInterval(intervalId)
  }, [nowHour, nowMinuts])

  return
}

export default MidnightRefresh
