import { FormEvent, useState } from 'react'
import { useMutation } from '../convex/_generated/react'
// from https://www.schemecolor.com/american-pastels.php
const COLORS = [
  '#D1F0A4',
  '#BAB8F3',
  '#F2C1F3',
  '#C6E8EE',
  '#FCF7E7',
  '#F7DDCD',
]

export const AddCard = ({ deckId }: { deckId: Id<'decks'> }) => {
  const addCard = useMutation('addCard')

  const [colorIndex, setColorIndex] = useState(
    Math.floor(Math.random() * COLORS.length)
  )
  const color = COLORS[colorIndex]

  const [newCardFront, setNewCardFront] = useState('')
  const [newCardBack, setNewCardBack] = useState('')

  const handleAddCard = async (e: FormEvent) => {
    e.preventDefault()
    await addCard(deckId, newCardFront, newCardBack, color)
    setNewCardFront('')
    setNewCardBack('')
    setColorIndex(Math.floor(Math.random() * COLORS.length))
  }

  return (
    <>
      <div className="card-editor">
        <div className="minicard" style={{ backgroundColor: color }}>
          {newCardFront}
        </div>
        <div className="minicard" style={{ backgroundColor: color }}>
          {newCardBack}
        </div>
      </div>

      <form onSubmit={handleAddCard}>
        <input
          value={newCardFront}
          onChange={(event) => setNewCardFront(event.target.value)}
          placeholder="Front"
        />
        <input
          value={newCardBack}
          onChange={(event) => setNewCardBack(event.target.value)}
          placeholder="Back"
        />
        <input
          type="submit"
          value="Add card"
          disabled={!newCardFront || !newCardBack}
        />
      </form>
    </>
  )
}
