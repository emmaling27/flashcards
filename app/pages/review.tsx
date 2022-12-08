import { FormEvent, useEffect, useState } from 'react'
import { Id } from '../convex/_generated/dataModel';
import { useMutation, useQuery } from '../convex/_generated/react'
import { useRouter } from 'next/router'


const Card = ({deckId}: {deckId: Id<"decks">}) => {
  const card = useQuery('showNextCard', deckId);

  if (!card) {
    return <div></div>;
  }
  return (
    <div>
      {card.front}
    </div>
  );
}

const Review = ({deckId}: {deckId: Id<'decks'>}) => {
  const deck = useQuery('getDeck', deckId);

  if (!deck) {
    return <main>Loading...</main>;
  }
  return (
    <main>
      <h1>Deck {deck.name}</h1>
      <Card deckId={deck._id} />
    </main>
  )
}

export default function App() {
  const router = useRouter();
  const { deck } = router.query;

  if (!deck) {
    return <main>Loading...</main>;
  }
  return <Review deckId={new Id("decks", deck as string)} />
}
