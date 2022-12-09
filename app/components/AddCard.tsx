import { FormEvent, useRef, useState } from 'react'
import { Id } from '../convex/_generated/dataModel'
import { useMutation } from '../convex/_generated/react'
import { randomColor } from '../shared/colors'

export const AddCard = ({ deckId }: { deckId: Id<'decks'> }) => {
  const addCard = useMutation('addCard')

  const [color, setColor] = useState(randomColor())

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
    setColor(randomColor())
  }

  return (
    <div className="add-card">
      <div className="card-editor">
        <div
          className="minicard"
          style={{ backgroundColor: color }}
          ref={frontRef}
          contentEditable
        />
        <div
          className="minicard"
          style={{ backgroundColor: color }}
          contentEditable
          ref={backRef}
        />
      </div>
      <button onClick={handleAddCard}>Add card</button>
    </div>
  )
}
