import '../styles/css/App.css'
import calendarContent from '../data/calendar-content'
import Window from '../components/Window'
import gridTemplate from '../data/grid-template'
import useWindowDimensions from '../hooks/useWindowDimensions'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import ReactAudioPlayer from 'react-audio-player'
import { Helmet } from 'react-helmet'
import { useEffect, useState } from 'react'
import jingleBells from '../audio/jingle-bells.mp3'

const GridStyle = styled.div`
  display: grid;
  overflow: hidden;
  justify-content: start;
  ${(props) =>
    `grid-template-columns: repeat(5, calc((${props.$screenWidth}px - 2em) / 5 ));
     max-width: ${props.$maxWidth}px;
  `}
  padding: 1em;
`

GridStyle.propTypes = {
  $screenWidth: PropTypes.number,
  $maxWidth: PropTypes.number,
}

const FilmsList = styled.div`
  margin-top: 2em;
  font-family: 'Courier New', Courier, monospace;

  h2 {
    font-size: 1em;
    color: white;
  }

  ul {
    text-align: start;
  }

  ul li::marker {
    color: white;
  }

  a {
    font-family: monospace;
    text-align: start;
    font-size: 0.95em;
    text-decoration: none;
    color: white;
  }

  a:hover {
    text-decoration: underline;
  }
`

function App() {
  const startDate = new Date(`12/01/2024`)
  const maxWidth = 600
  const screenWidth = Math.min(useWindowDimensions().width, maxWidth)

  const calculateTimeLeft = () => {
    let difference = +startDate - +new Date()

    let timeLeft = {}

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    return timeLeft
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  const isItTime = () => {
    return (
      (timeLeft.days === 0 &&
        timeLeft.hours === 0 &&
        timeLeft.minutes === 0 &&
        timeLeft.seconds === 0) ||
      +startDate < +new Date()
    )
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearTimeout(timer)
  })

  let days = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]

  for (let index = 0; index < days.length; index++) {
    if (JSON.parse(window.localStorage.getItem(index)) === true) {
      days[index] = 1
    }
  }

  const [openDays, setOpenDay] = useState(days)

  function open(day) {
    setOpenDay(
      openDays.map((d, index) => {
        return index === day ? 1 : d
      })
    )
  }

  const date = new Date()

  const formatCountdown = () => {
    let countDown = ''
    countDown +=
      24 - date.getHours() > 0 ? `${24 - date.getHours()} heures ` : ''
    countDown +=
      60 - date.getMinutes() > 0 ? `${24 - date.getMinutes()} minutes ` : ''
    countDown += `${60 - date.getSeconds()} secondes`
    return countDown
  }

  return (
    <div className="App">
      <Helmet>
        <title>Super calendrier de l'avent</title>
      </Helmet>
      <header className="App-header">
        <h1>
          Le super calendrier de l'avent de <br /> Films de Noël pour Anaïs
        </h1>
      </header>
      {isItTime() ? (
        <p>
          {formatCountdown()}
          <br />
          avant la prochaine case !!!
        </p>
      ) : (
        <p>
          {timeLeft.days > 0 && <span>{timeLeft.days} jours </span>}
          {timeLeft.hours > 0 && <span>{timeLeft.hours} heures </span>}
          {timeLeft.minutes > 0 && <span>{timeLeft.minutes} minutes </span>}
          {timeLeft.seconds} secondes avant la première case du calendrier !
        </p>
      )}
      <GridStyle $screenWidth={screenWidth} $maxWidth={maxWidth}>
        {gridTemplate.map((cell, index) => {
          const window = calendarContent.find((day) => day.day === cell.day)
          const position = [cell.position[0] + 1, cell.position[1] + 1]
          const key =
            window !== undefined ? window.name + ' ' + index : 'empty ' + index
          return (
            <Window
              key={key}
              screenWidth={screenWidth}
              pos={position}
              size={cell.size}
              type={cell.type}
              color={cell.color}
              day={window?.day}
              link={window?.link}
              openDay={open}
            />
          )
        })}
      </GridStyle>
      {openDays.some((openday) => openday === 1) && (
        <FilmsList>
          <h2>Liste des films déjà découverts : </h2>
          <ul>
            {openDays.map((openday, index) => {
              return (
                openday === 1 && (
                  <li key={index}>
                    <a
                      href={
                        calendarContent.find((date) => date.day === index)?.link
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      crossorigin="use-credentials"
                    >
                      {index +
                        ' - ' +
                        calendarContent.find((date) => date.day === index)
                          ?.name}
                    </a>
                  </li>
                )
              )
            })}
          </ul>
        </FilmsList>
      )}
      <ReactAudioPlayer
        src={jingleBells}
        crossorigin="anonymous"
        autoPlay
        loop
      />
    </div>
  )
}

export default App
