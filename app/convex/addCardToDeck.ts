import { Auth } from 'convex/dist/types/server/server';
import { Id } from './_generated/dataModel';
import { DatabaseReader, mutation } from './_generated/server'
import { getUser } from './addDeck'

export default mutation(async ({ db, auth }, cardId: Id<'cards'>, deckId: Id<'decks'>) => {
  const user = await getUser(db, auth);
  await db.insert('card_decks', {
    deck: deckId,
    card: cardId,
  });
})
