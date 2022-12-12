import { useRef } from 'react'
import { Id } from '../convex/_generated/dataModel'
import { useMutation } from '../convex/_generated/react'
import { Document } from '../convex/_generated/dataModel'
import IconButton from '@mui/material/IconButton/IconButton'
import { Delete } from '@mui/icons-material'
import { Tooltip } from '@mui/material'

export const EditCard = ({
  deckId,
  card,
}: {
  deckId: Id<'decks'>
  card: Document<'cards'>
}) => {
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

  const removeCard = useMutation('removeCardFromDeck')
  let typingTimer: any

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
            clearTimeout(typingTimer)

            typingTimer = setTimeout(async () => {
              await editCard(card)
            }, 1000)
          }}
        >
          {card.back}
        </div>
        <Tooltip title="Delete card" placement="right">
          <IconButton
            color="primary"
            aria-label="delete card from deck"
            component="label"
            onClick={() => removeCard(card._id, deckId)}
          >
            <Delete />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  )
}
