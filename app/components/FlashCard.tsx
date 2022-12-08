import { useState } from 'react'

// from https://www.schemecolor.com/american-pastels.php
const COLORS = [
  '#D1F0A4',
  '#BAB8F3',
  '#F2C1F3',
  '#C6E8EE',
  '#FCF7E7',
  '#F7DDCD',
]

export default function ({ text }: { text: string }) {
  const [colorIndex] = useState(Math.floor(Math.random() * COLORS.length))
  const color = COLORS[colorIndex]
  return (
    <div className={'card'} style={{ backgroundColor: color }}>
      {text}
    </div>
  )
}
