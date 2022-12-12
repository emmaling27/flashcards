import Button from '@mui/material/Button/Button'
import Popover from '@mui/material/Popover/Popover'
import { useState } from 'react'
import { Id } from '../convex/_generated/dataModel'
import { useQuery } from '../convex/_generated/react'
import { AddToDeck } from './AddToDeck'
import FlashCard from './FlashCard'

export const Card = ({ deckId }: { deckId: Id<'decks'> }) => {
  const card = useQuery('showNextCard', deckId)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  if (card === undefined) {
    return <div>'Loading card...'</div>
  }
  if (!card) {
    return <div>No cards left to review right now! Come back later.</div>
  }
  return (
    <div>
      <FlashCard card={card} />
      <Button
        variant="contained"
        onClick={(e) => {
          setAnchorEl(e.currentTarget)
        }}
      >
        Add to another deck
      </Button>
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <AddToDeck card={card} close={() => setAnchorEl(null)} />
      </Popover>
    </div>
  )
}
