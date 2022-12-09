import { useRef } from 'react'
import { Id } from '../convex/_generated/dataModel'
import { useMutation } from '../convex/_generated/react'
import { Document } from '../convex/_generated/dataModel'

export const EditCard = ({
  deckId,
  card,
}: {
  deckId: Id<'decks'>
  card: Document<'cards'>
}) => {
  const addCard = useMutation('addCard')

  const frontRef = useRef<HTMLDivElement>(null)
  const backRef = useRef<HTMLDivElement>(null)

  const editCard = useMutation('updateCard').withOptimisticUpdate(
    (localStore, card) => {
      const currentValue = localStore.getQuery('listCards', [deckId])
      if (currentValue !== undefined) {
        let cards = []
        for (const curCard of currentValue) {
          if (curCard._id.equals(card._id)) {
            cards.push(card)
          } else {
            cards.push(curCard)
          }
        }
        localStore.setQuery('listCards', [deckId], cards)
      }
    }
  )

  return (
    <div className="add-card">
      <div className="card-editor">
        <div
          className="minicard"
          style={{ backgroundColor: card.color }}
          ref={frontRef}
          onKeyUp={async () => {
            card.front = frontRef.current!.innerText
            await editCard(card)
          }}
          contentEditable
        >
          {card.front}
        </div>
        <div
          className="minicard"
          style={{ backgroundColor: card.color }}
          contentEditable
          ref={backRef}
          onKeyUp={async () => {
            card.back = backRef.current!.innerText
            await editCard(card)
          }}
        >
          {card.back}
        </div>
      </div>
    </div>
  )
}
