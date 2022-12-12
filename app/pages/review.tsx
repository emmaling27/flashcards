import { Id } from '../convex/_generated/dataModel'
import { useRouter } from 'next/router'
import { Review } from '../components/Review'
import { Button, Tooltip } from '@mui/material'

export default function App() {
  const router = useRouter()
  const { deck } = router.query

  if (!deck) {
    return <main>Redirecting...</main>
  }
  return (
    <div>
      <Tooltip title="Browse all decks">
        <Button
          variant="contained"
          style={{ position: 'relative', top: 10, left: 10 }}
          onClick={() => router.back()}
        >
          Decks
        </Button>
      </Tooltip>
      <Review deckId={new Id('decks', deck as string)} />
    </div>
  )
}
