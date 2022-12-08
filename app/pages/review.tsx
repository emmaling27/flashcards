import { FormEvent, useEffect, useState } from 'react'
import { Id } from '../convex/_generated/dataModel';
import { useMutation, useQuery } from '../convex/_generated/react'
import { useRouter } from 'next/router'


const Card = ({deckId}: {deckId: Id<"decks">}) => {
  const card = useQuery('showNextCard', deckId);
  const [front, setFront] = useState(true);

  const flip = () => {
    setFront(!front);
  };

  if (card === undefined) {
    return <div className={"card"}>Loading card...</div>;
  }
  if (!card) {
    return <div className={"card"}>No cards</div>;
  }
  return (
    <div className={"card"}>
      <p className={"cardText"}>{front ? card.front : card.back}</p>
      <button onClick={flip}>flip</button>
    </div>
  );
}

const AddCard = ({deckId}: {deckId: Id<"decks">}) => {
  const addCard = useMutation('addCard');

  const [newCardFront, setNewCardFront] = useState('');
  const [newCardBack, setNewCardBack] = useState('');

  const handleAddCard = async (e: FormEvent) => {
    e.preventDefault();
    await addCard(deckId, newCardFront, newCardBack);
    setNewCardFront('');
    setNewCardBack('');
  };

  return (<form onSubmit={handleAddCard}>
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
        <input type="submit" value="Add card" disabled={!newCardFront || !newCardBack} />
      </form>);
};

const Review = ({deckId}: {deckId: Id<'decks'>}) => {
  const deck = useQuery('getDeck', deckId);

  if (!deck) {
    return <main>Loading Deck...</main>;
  }
  return (
    <main>
      <h1>{deck.name}</h1>
      <p>{deck.description}</p>
      <AddCard deckId={deckId} />
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
