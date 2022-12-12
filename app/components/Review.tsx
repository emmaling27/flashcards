import IconButton from '@mui/material/IconButton/IconButton'
import { useState } from 'react'
import { Id } from '../convex/_generated/dataModel'
import { useQuery } from '../convex/_generated/react'
import { Card } from './Card'
import { DeckEditor } from './DeckEditor'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'
import { Tooltip } from '@mui/material'

export const Review = ({ deckId }: { deckId: Id<'decks'> }) => {
  const deck = useQuery('getDeck', deckId)
  const deckStats = useQuery('deckStats', deckId) || null
  const [editMode, setEditMode] = useState(false)

  if (!deck) {
    return <main>Loading Deck...</main>
  }
  return (
    <main>
      <h1>{deck.name}</h1>
      <Tooltip title={editMode ? 'Done editing' : 'Edit this deck'}>
        <IconButton
          color="primary"
          aria-label="edit deck"
          component="label"
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? <CheckIcon /> : <EditIcon />}
        </IconButton>
      </Tooltip>
      <p>{deck.description}</p>
      {deckStats && <p>{deckStats.numCards} cards in deck</p>}
      {editMode ? (
        <DeckEditor deckId={deckId} />
      ) : (
        <div>
          <Card deckId={deck._id} />
        </div>
      )}
    </main>
  )
}
