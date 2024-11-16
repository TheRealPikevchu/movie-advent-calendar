import '../styles/css/App.css'
import calendarContent from '../data/calendar-content'
import Window from '../components/Window'
import gridTemplate from '../data/grid-template'
import useWindowDimensions from '../hooks/useWindowDimensions'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const GridStyle = styled.div`
  display: grid;
  overflow: hidden;
  justify-content: start;
  ${(props) =>
    `grid-template-columns: repeat(5, calc((${props.screenWidth}px - 2em) / 5 ));
     max-width: ${props.maxWidth}px;
  `}
  padding: 1em;
`

GridStyle.propTypes = {
  screenWidth: PropTypes.number,
  maxWidth: PropTypes.number,
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
  let days = new Array(31)
  days.fill(1)

  const maxWidth = 1200
  const screenWidth = Math.min(useWindowDimensions().width, maxWidth)

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Le super calendrier de l'avent de <br /> Films de Noël pour Anaïs
        </h1>
      </header>
      <GridStyle screenWidth={screenWidth} maxWidth={maxWidth}>
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
            />
          )
        })}
      </GridStyle>
      <FilmsList>
        <h2>Liste des films déjà ouverts : </h2>
        <ul>
          {days.map((day, index) => {
            return (
              JSON.parse(window.localStorage.getItem(index)) === true && (
                <li key={index}>
                  <a
                    href={calendarContent.find((day) => day.day === index).link}
                  >
                    {index +
                      ' - ' +
                      calendarContent.find((day) => day.day === index).name}
                  </a>
                </li>
              )
            )
          })}
        </ul>
      </FilmsList>
    </div>
  )
}

export default App
