import {useEffect, useState} from 'react'
import {animated, useTransition} from '@react-spring/web'
import './App.css'
import {data} from './data'

type ArtworkData = {
  id: number
  color: string
  left: number
}

function App() {
  const [rows, set] = useState(data)

  useEffect(() => {
    let i = 0
    const t = setInterval(() => {
      const dataView = [...data].splice(i, 10)
      if (i >= data.length - 1) {
        i = 0
      } else {
        i += 1
      }
      set(dataView.reverse())
    }, 1000)
    return () => clearInterval(t)
  }, [])

  const artworkWidth = 120;
  const artworkData = rows.map((el, idx) => ({
    color: el.color,
    left: artworkWidth * idx,
    id: el.id
  }))

  const transitions = useTransition(
    artworkData,
    {
      key: (item: ArtworkData) => item.id,
      from: {opacity: 0},
      leave: ({left}) => ({opacity: 0, left: left + (artworkWidth)}),
      enter: {opacity: 1},
      update: ({left}) => ({left})
    }
  )

  return (
    <div className='animatedWrapper'>
      {transitions(({opacity, left, bottom}, item) => (
        <animated.div className='squareDiv' style={{left, opacity, backgroundColor: item.color,}}>
          {item.id}
        </animated.div>
      ))}
    </div>)
}

export default App
