import PropTypes from 'prop-types'
import styled from 'styled-components'
import '../styles/css/Window.css'
import useWindowOpenState from '../hooks/useWindowOpenState'
import MidnightRefresh from './MidnightRefresh'

Window.propTypes = {
  screenWidth: PropTypes.number,
  pos: PropTypes.array,
  size: PropTypes.array,
  type: PropTypes.string,
  color: PropTypes.string,
  day: PropTypes.number,
  link: PropTypes.string,
  openDay: PropTypes.func,
}

const WindowPlaceholder = styled.div`
  display: flex;
  ${(props) => `grid-row: ${props.$pos[0]};`}
  ${(props) => `grid-column: ${props.$pos[1]};`}
  ${(props) => `width: calc((${props.$screenWidth}px - 2em) / 5 - 1em);`}
  ${(props) => `height: calc((${props.$screenWidth}px - 2em) / 5 - 1em);`}
`

WindowPlaceholder.propTypes = {
  $pos: PropTypes.array,
  $screenWidth: PropTypes.number,
}

const WindowContent = styled.div`
  margin-left: 0.5em;
  margin-top: 0.5em;
  ${(props) =>
    `width: calc(((${props.$screenWidth}px - 2em) / 5 - 1em) * 
    ${props.$size[0]} + 1em * calc(${props.$size[0]} - 1));`}
  ${(props) =>
    `height: calc(((${props.$screenWidth}px - 2em) / 5 - 1em) * 
    ${props.$size[1]} + 0.25em * calc(${props.$size[1]} - 1));`}
`

WindowContent.propTypes = {
  $size: PropTypes.array,
  $screenWidth: PropTypes.number,
}

function Window({ screenWidth, pos, size, type, color, day, link, openDay }) {
  const [isOpen, setOpen] = useWindowOpenState(day, false)

  const date = new Date()

  return (
    <WindowPlaceholder
      $pos={pos}
      $screenWidth={screenWidth}
      className="window-placeholder"
    >
      <MidnightRefresh />
      <WindowContent
        $size={size}
        $screenWidth={screenWidth}
        className={
          'window-content' +
          ' ' +
          (type === 'empty' ? 'window-content__empty' : '') +
          ' ' +
          (type === 'circle' ? 'window-content__circle' : '') +
          ' ' +
          `window-content__${isOpen ? 'b-' : ''}${color}`
        }
      >
        {(date.getDate() >= day && date.getMonth() > 10) ||
        date.getFullYear() > 2024 ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            crossorigin="use-credentials"
            onClick={() => {
              openDay(day)
              setOpen(true)
            }}
          >
            {day}
          </a>
        ) : (
          <p>{day}</p>
        )}
      </WindowContent>
    </WindowPlaceholder>
  )
}

export default Window
