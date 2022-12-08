import { FormEvent, useState } from 'react'
import { Id, Document } from '../convex/_generated/dataModel'
import { useMutation, useQuery } from '../convex/_generated/react'
import { useRouter } from 'next/router'
import FlashCard from '../components/FlashCard'
import { Button, Popover } from '@mui/material'

const AddToDeck = ({
  card,
  close,
}: {
  card: Document<'cards'>
  close: () => void
}) => {
  const addCardToDeck = useMutation('addCardToDeck')
  const decks = useQuery('listDecks') || []

  const handleClickDeck = async (deckId: Id<'decks'>) => {
    await addCardToDeck(card._id, deckId)
    close()
  }

  return <div>
    <ul>
      {decks.map((deck) => (
        <li key={deck._id.toString()} onClick={() => handleClickDeck(deck._id)}>
          <span>{deck.name}</span>
          <span>{deck.description}</span>
        </li>
      ))}
    </ul>
  </div>;
};

// from https://www.schemecolor.com/american-pastels.php
const COLORS = [
  '#D1F0A4',
  '#BAB8F3',
  '#F2C1F3',
  '#C6E8EE',
  '#FCF7E7',
  '#F7DDCD',
]

const Card = ({deckId}: {deckId: Id<"decks">}) => {
  const card = useQuery('showNextCard', deckId);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  
  if (card === undefined) {
    return <div>'Loading card...'</div>
  }
  if (!card) {
    return <div>'No cards'</div>
  }
  return <div>
    <FlashCard card={card} />
      <Button variant="contained" onClick={(e) => {
        setAnchorEl(e.currentTarget);
      }}>Add to another deck</Button>
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
    </div>;
}

const AddCard = ({ deckId }: { deckId: Id<'decks'> }) => {
  const addCard = useMutation('addCard')

  const [colorIndex] = useState(Math.floor(Math.random() * COLORS.length))
  const color = COLORS[colorIndex]

  const [newCardFront, setNewCardFront] = useState('')
  const [newCardBack, setNewCardBack] = useState('')

  const handleAddCard = async (e: FormEvent) => {
    e.preventDefault()
    await addCard(deckId, newCardFront, newCardBack, color)
    setNewCardFront('')
    setNewCardBack('')
  }

  return (
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
  )
}

const Review = ({ deckId }: { deckId: Id<'decks'> }) => {
  const deck = useQuery('getDeck', deckId);
  const deckStats = useQuery('deckStats', deckId) || null;

  if (!deck) {
    return <main>Loading Deck...</main>
  }
  return (
    <main>
      <h1>{deck.name}</h1>
      <p>{deck.description}</p>
      {deckStats && <p>{deckStats.numCards} cards in deck</p>}
      <AddCard deckId={deckId} />
      <Card deckId={deck._id} />
    </main>
  )
}

export default function App() {
  const router = useRouter()
  const { deck } = router.query

  if (!deck) {
    return <main>Redirecting...</main>
  }
  return (<div>
    <button style={{position: "absolute", top: 10, left: 10}} onClick={() => router.back()}>Decks</button>
    <Review deckId={new Id('decks', deck as string)} />
  </div>);
}
