import { Document } from '../convex/_generated/dataModel'

export default function ({ card }: { card: Document<'cards'> }) {
  return (
    <div className={'card'} style={{ backgroundColor: card.color }}>
      {card.front}
    </div>
  )
}
