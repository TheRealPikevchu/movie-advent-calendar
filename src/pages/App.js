import '../styles/css/App.css'
import calendarContent from '../data/calendar-content'
import Window from '../components/Window'
import gridTemplate from '../data/grid-template'
import useWindowDimensions from '../hooks/useWindowDimensions'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import ReactAudioPlayer from 'react-audio-player'
import { Helmet } from 'react-helmet'
import { useState } from 'react'

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
  const maxWidth = 600
  const screenWidth = Math.min(useWindowDimensions().width, maxWidth)

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
          <h2>Liste des films déjà ouverts : </h2>
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
      <ReactAudioPlayer src="/audio/jingle-bells.mp3" autoPlay controls loop />
    </div>
  )
}

export default App
