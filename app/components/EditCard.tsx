import { FormEvent, useRef, useState } from 'react'
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

  // const handleAddCard = async (e: FormEvent) => {
  //   e.preventDefault()
  //   await addCard(
  //     deckId,
  //     frontRef.current!.innerText,
  //     backRef.current!.innerText
  //   )
  //   frontRef.current!.innerText = ''
  //   backRef.current!.innerText = ''
  // }

  return (
    <div className="add-card">
      <div className="card-editor">
        <div
          className="minicard"
          style={{ backgroundColor: card.color }}
          ref={frontRef}
          contentEditable
        >
          {card.front}
        </div>
        <div
          className="minicard"
          style={{ backgroundColor: card.color }}
          contentEditable
          ref={backRef}
        >
          {card.back}
        </div>
      </div>
    </div>
  )
}
