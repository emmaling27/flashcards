import { useQuery } from '../convex/_generated/react'
import Deck from './Deck'

export default function DeckPicker() {
  const decks = useQuery('listDecks') || []
  return (
    <div className="deck-picker">
      {decks.map((deck) => (
        <Deck deck={deck} />
      ))}
    </div>
  )
}
