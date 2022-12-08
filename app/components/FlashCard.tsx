import { useState } from 'react'
import { Document } from '../convex/_generated/dataModel'
import Image from 'next/image'
export default function ({ card }: { card: Document<'cards'> }) {
  const [front, setFront] = useState(true)

  const flip = () => {
    setFront(!front)
  }
  return (
    <div className="card" onClick={flip}>
      <div className="card-inner" style={{ backgroundColor: card.color }}>
        <div className="card-front">{card.front}</div>
        <div className="card-back">{card.back}</div>
      </div>
    </div>
  )
}
