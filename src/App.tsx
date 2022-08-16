import { useEffect, useState } from 'react'
import { useSpring, useTransition, animated, config } from '@react-spring/web'
import './App.css'
import { ArtworkData, data } from './data'

function App() {
  const [rows, set] = useState(data)
  useEffect(() => {
    const t = setInterval(() => {
      const dataCopy = [...data]
      dataCopy.sort(() => Math.random() - 0.5)
      set(dataCopy)
    }, 2000)
    return () => clearInterval(t)
  }, [])

  const artworkWidth = 100;
  const artworkData = rows.map((el, idx) => ({
    color: el.color,
    x: artworkWidth * idx
  }))

  const transitions = useTransition(
    artworkData,
    {
      key: (item: ArtworkData) => item.id,
      from: { opacity: 0 },
      leave: { opacity: 0 },
      enter: ({ x }) => ({ x, opacity: 1 }),
      update: ({ x }) => ({ x })
    }

  )

  return (
    <div className='animatedWrapper'>
      {transitions((style, item, t, index) => (
        <animated.div className='squareDiv' style={{ backgroundColor: item.color }}>
        </animated.div>
      ))}
    </div>
  )
}

export default App

interface ArtworkProps {
  color: string
}

function Artwork(props: ArtworkProps) {
  return (
    <div className='squareDiv' style={{ backgroundColor: props.color }} />
  )

}

function Text() {
  const [flip, set] = useState(false)

  useEffect(() => {

  },
    [])

  const props = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    reset: true,
    reverse: flip,
    delay: 200,
    config: config.molasses,
    onRest: () => set(!flip)
  })

  return <animated.h1 style={props}>Hello</animated.h1>
}

function MovingDiv() {

  const styles = useSpring({
    from: { x: 0 },
    to: { x: 2560 },
    delay: 800
  })

  return (
    <animated.div
      style={{
        width: 100,
        height: 100,
        backgroundColor: '#FF7C7C',
        borderRadius: '8px',
        ...styles
      }} />
  )
}
