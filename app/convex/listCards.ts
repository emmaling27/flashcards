import { query } from './_generated/server'
import { Document, Id } from './_generated/dataModel'
import { cardsInDeck } from './showNextCard';

export default query(async ({ db }, deckId: Id<"decks">): Promise<Document<'cards'>[]> => {
  let cards = await cardsInDeck(db, deckId);
  let cardContents = (await Promise.all(cards.map( (id) => db.get(id)))).filter((x): x is Document<'cards'> => x !== null);
  return cardContents;
})
