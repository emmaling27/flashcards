import { Id } from '../convex/_generated/dataModel'
import { useRouter } from 'next/router'
import { Review } from '../components/Review'

export default function App() {
  const router = useRouter()
  const { deck } = router.query

  if (!deck) {
    return <main>Redirecting...</main>
  }
  return (
    <div>
      <button
        style={{ position: 'absolute', top: 10, left: 10 }}
        onClick={() => router.back()}
      >
        Decks
      </button>

      <Review deckId={new Id('decks', deck as string)} />
    </div>
  )
}
