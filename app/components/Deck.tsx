import { useRouter } from 'next/router'
import { Document, Id } from '../convex/_generated/dataModel'

export default function Deck(props: { deck: Document<'decks'> }) {
  const router = useRouter()
  function handleClickDeck() {
    router.push(`/review?deck=${props.deck._id.toString()}`)
  }
  return (
    <div onClick={handleClickDeck} className="deck">
      <strong>{props.deck.name}</strong>
      {props.deck.description}
    </div>
  )
}
