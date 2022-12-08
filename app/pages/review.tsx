import { FormEvent, useEffect, useState } from 'react'
import { Id } from '../convex/_generated/dataModel';
import { useMutation, useQuery } from '../convex/_generated/react'
import { useRouter } from 'next/router'


const Card = ({deckId}: {deckId: Id<"decks">}) => {
  const card = useQuery('showNextCard', deckId);

  if (card === undefined) {
    return <div>Loading card...</div>;
  }
  if (!card) {
    return <div>No cards</div>;
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
    return <main>Loading Deck...</main>;
  }
  return (
    <main>
      <h1>{deck.name}</h1>
      <p>{deck.description}</p>
      <Card deckId={deck._id} />
    </main>
  )
}

export default function App() {
  const router = useRouter();
  const { deck } = router.query;

  if (!deck) {
    return <main>Redirecting...</main>;
  }
  return <Review deckId={new Id("decks", deck as string)} />
}
