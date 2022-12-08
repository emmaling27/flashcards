import { FormEvent, useEffect, useState } from 'react'
import { Id } from '../convex/_generated/dataModel';
import { useMutation, useQuery } from '../convex/_generated/react'

const Card = ({deckId}: {deckId: Id<"decks">}) => {
  const card = useQuery('getNextCard', deckId);

  return (
    <div>
      {card.front}
    </div>
  );
}

export default function App() {
  const deck = useQuery('getDeck');

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
