import { Id } from '../convex/_generated/dataModel'
import { useQuery } from '../convex/_generated/react'
import { AddCard } from './AddCard'
import { EditCard } from './EditCard'

export const DeckEditor = ({ deckId }: { deckId: Id<'decks'> }) => {
  const cards = useQuery('listCards', deckId)
  return (
    <div>
      {' '}
      <AddCard deckId={deckId} />
      {cards?.map((card) => (
        <EditCard deckId={deckId} card={card} />
      ))}
    </div>
  )
}
