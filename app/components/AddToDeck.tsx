import { useMutation, useQuery } from '../convex/_generated/react'
import { Id, Document } from '../convex/_generated/dataModel'

export const AddToDeck = ({
  card,
  close,
  deckId,
}: {
  card: Document<'cards'>
  close: () => void
  deckId: Id<'decks'>
}) => {
  const addCardToDeck = useMutation('addCardToDeck')
  const decks = useQuery('listDecks') || []

  const handleClickDeck = async (deckId: Id<'decks'>) => {
    await addCardToDeck(card._id, deckId)
    close()
  }

  return (
    <div>
      <ul>
        {decks
          .filter((d) => !d._id.equals(deckId))
          .map((deck) => (
            <li
              key={deck._id.toString()}
              onClick={() => handleClickDeck(deck._id)}
            >
              <span>{deck.name}: </span>
              <span>{deck.description}</span>
            </li>
          ))}
      </ul>
    </div>
  )
}
