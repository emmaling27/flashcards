import { FormEvent, useRef, useState } from 'react'
import { Id } from '../convex/_generated/dataModel'
import { useMutation } from '../convex/_generated/react'
import { Document } from '../convex/_generated/dataModel'

// from https://www.schemecolor.com/american-pastels.php
const COLORS = [
  '#D1F0A4',
  '#BAB8F3',
  '#F2C1F3',
  '#C6E8EE',
  '#FCF7E7',
  '#F7DDCD',
]

export const EditCard = ({
  deckId,
  card,
}: {
  deckId: Id<'decks'>
  card: Document<'cards'>
}) => {
  const addCard = useMutation('addCard')

  const [colorIndex, setColorIndex] = useState(
    Math.floor(Math.random() * COLORS.length)
  )
  const color = COLORS[colorIndex]

  const frontRef = useRef<HTMLDivElement>(null)
  const backRef = useRef<HTMLDivElement>(null)

  const handleAddCard = async (e: FormEvent) => {
    e.preventDefault()
    await addCard(
      deckId,
      frontRef.current!.innerText,
      backRef.current!.innerText,
      color
    )
    frontRef.current!.innerText = ''
    backRef.current!.innerText = ''
    setColorIndex((colorIndex + 1) % COLORS.length)
  }

  return (
    <div className="add-card">
      <div className="card-editor">
        <div
          className="minicard"
          style={{ backgroundColor: color }}
          ref={frontRef}
          contentEditable
        >
          {card.front}
        </div>
        <div
          className="minicard"
          style={{ backgroundColor: color }}
          contentEditable
          ref={backRef}
        >
          {card.back}
        </div>
      </div>
    </div>
  )
}
