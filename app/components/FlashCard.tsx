import { useState } from 'react'
import { Document } from '../convex/_generated/dataModel'
import Image from 'next/image'
import { useMutation } from '../convex/_generated/react'
export default function ({ card }: { card: Document<'cards'> }) {
  const [front, setFront] = useState(true)
  const reviewCard = useMutation('reviewCard')
  const flip = () => {
    setFront(!front)
  }
  return (
    <div className="card-container">
      <div className="card" onClick={flip}>
        <div className="card-inner" style={{ backgroundColor: card.color }}>
          <div className="card-front">{card.front}</div>
          <div className="card-back">{card.back}</div>
        </div>
      </div>
      <div className="review-card">
        <button
          onClick={() => reviewCard(card._id, 'Good')}
          title="Mark card as correct"
        >
          👍
        </button>
        <button
          onClick={() => reviewCard(card._id, 'Hard')}
          title="Mark card as incorrect"
        >
          👎
        </button>
        <button
          onClick={() => reviewCard(card._id, 'Easy')}
          title="Don't show this card again for a while"
        >
          🕰
        </button>
      </div>
    </div>
  )
}
