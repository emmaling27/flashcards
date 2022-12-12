import { Tooltip } from '@mui/material'
import { useState } from 'react'
import { Document } from '../convex/_generated/dataModel'
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
        <Tooltip title="That was too easy.">
          <button onClick={() => reviewCard(card._id, 'Easy')}>🕰</button>
        </Tooltip>
        <Tooltip title="I got it right!">
          <button onClick={() => reviewCard(card._id, 'Good')}>👍</button>
        </Tooltip>
        <Tooltip title="I struggled with that one...">
          <button onClick={() => reviewCard(card._id, 'Hard')}>👎</button>
        </Tooltip>
      </div>
    </div>
  )
}
